import { prisma } from "@config/prisma.connect"
import prismaErrorWrapper from "@lib/prismaErrorWrapper"
import { NextApiRequest, NextApiResponse } from "next"

export default async function (req : NextApiRequest, res : NextApiResponse) {
    const { activityId } = req.query

    return prismaErrorWrapper(res, async () => {
        return await prisma.activity.findUnique({
            where: {
                activityId: activityId as string
            },
            include: {
                learningObjectives: true,
                codingActivity: {
                    select: {
                        codingactivityId: true,
                        question: true,
                        language: true,
                        skeletonCode: true,
                        submissions: true,
                    },
                },
            },
        })
    })
}
