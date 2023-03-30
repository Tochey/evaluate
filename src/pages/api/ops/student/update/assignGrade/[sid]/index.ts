import { prisma } from "@config/prisma.connect"
import prismaErrorWrapper from "@lib/prismaErrorWrapper"
import { NextApiRequest, NextApiResponse } from "next"

export default async function assignActivityGrade(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { sid } = req.query
    const { codingActivityId, sourceCode, score, submittedAt } = req.body

    return prismaErrorWrapper(res, async () => {
        const existingSubmission = await prisma.submission.findFirst({
            where: {
                studentid: sid as string,
                codingActivityId: codingActivityId,
            },
            orderBy: {
                submittedAt: "desc",
            },
        })

        console.log(existingSubmission)

        if (existingSubmission) {
            return await prisma.submission.update({
                where: {
                    submissionId: existingSubmission.submissionId,
                },
                data: {
                    sourceCode: sourceCode,
                    score: score,
                    submittedAt: submittedAt,
                    numofattempts: existingSubmission.numofattempts + 1,
                },
            })
        } else {
            return await prisma.submission.create({
                data: {
                    studentid: sid as string,
                    codingActivityId: codingActivityId,
                    sourceCode: sourceCode,
                    score: score,
                    submittedAt: submittedAt,
                    numofattempts: 1,
                },
            })
        }
    })
}
