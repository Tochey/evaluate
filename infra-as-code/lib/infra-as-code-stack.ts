import {
    Duration,
    RemovalPolicy,
    SecretValue,
    Stack,
    StackProps,
} from "aws-cdk-lib"
import { Construct } from "constructs"
import * as lambda from "aws-cdk-lib/aws-lambda"
import * as rds from "aws-cdk-lib/aws-rds"
import * as ec2 from "aws-cdk-lib/aws-ec2"
import * as wafv2 from "aws-cdk-lib/aws-wafv2"
import * as apigw from "aws-cdk-lib/aws-apigateway"
import * as cdk from "aws-cdk-lib"

export class InfraAsCodeStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props)
        const vpc = new ec2.Vpc(this, "evaluate_vpc", {
            ipAddresses: ec2.IpAddresses.cidr("10.0.0.0/16"),
            vpcName: "evaluate-vpc",
            enableDnsHostnames: true,
            enableDnsSupport: true,
            natGateways: 0,
            subnetConfiguration: [
                {
                    name: "evaluate-rds-public1a",
                    subnetType: ec2.SubnetType.PUBLIC,
                    cidrMask: 24,
                },
            ],
            maxAzs: 2,
        })

        const subnetGroup = new rds.SubnetGroup(this, "evaluate_rds-subG", {
            description: "subnet group for evaluate-rds",
            vpc,
            removalPolicy: RemovalPolicy.DESTROY,
            subnetGroupName: "evaluate-rds-sg",
            vpcSubnets: {
                availabilityZones: ["us-east-1a", "us-east-1b"],
                subnets: vpc.publicSubnets,
            },
        })

        const evaluateSG = new ec2.SecurityGroup(this, "evaluate_rds-secG", {
            vpc,
            allowAllOutbound: true,
            description: "evaluate-vpc-secG",
        })

        evaluateSG.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.allTraffic())

        const instance = new rds.DatabaseInstance(this, "evaluate_database", {
            vpc,
            engine: rds.DatabaseInstanceEngine.mysql({
                version: rds.MysqlEngineVersion.VER_8_0_28,
            }),
            credentials: {
                username: "admin",
                password: SecretValue.ssmSecure("evaluate-rds-password"),
            },
            databaseName: "evaluate",
            instanceIdentifier: "db-evaluate",
            publiclyAccessible: true,
            subnetGroup,
            removalPolicy: RemovalPolicy.DESTROY,
            instanceType: ec2.InstanceType.of(
                ec2.InstanceClass.T2,
                ec2.InstanceSize.MICRO
            ),
            securityGroups: [evaluateSG],
        })

        const custom_docker_runtime = new lambda.DockerImageFunction(
            this,
            "evaluate_docker",
            {
                code: lambda.DockerImageCode.fromImageAsset("lambda"),
                memorySize: 3000,
                timeout: Duration.seconds(5),
            }
        )

        const evaluate_rce_api = new apigw.LambdaRestApi(
            this,
            "evalaute_rce-api",
            {
                handler: custom_docker_runtime,
                proxy: false,
                restApiName: "evaluateRCE",
                defaultCorsPreflightOptions: {
                    allowOrigins: apigw.Cors.ALL_ORIGINS,
                },
            }
        )

        const run_code = evaluate_rce_api.root.addResource("run-code")
        const submit_code = evaluate_rce_api.root.addResource("submit-code")

        run_code.addMethod(
            "POST",
            new apigw.LambdaIntegration(custom_docker_runtime)
        )
        submit_code.addMethod(
            "POST",
            new apigw.LambdaIntegration(custom_docker_runtime)
        )

        new cdk.CfnOutput(this, "submit_code_path", {
            value: submit_code.path,
        })
    }
}
