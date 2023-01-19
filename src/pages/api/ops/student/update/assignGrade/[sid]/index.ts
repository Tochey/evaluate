import { prisma } from "@config/prisma.connect"
import prismaErrorWrapper from "@lib/prismaErrorWrapper"
import { NextApiRequest, NextApiResponse } from "next"

export default async function assignActivityGrade(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { sid } = req.query
    const { codingActivityId, sourceCode, score } = req.body

    return prismaErrorWrapper(res, async () => {
        return await prisma.submission.create({
            data: {
                studentid: sid as string,
                codingActivityId: codingActivityId,
                sourceCode: sourceCode,
                score: score,
            },
        })
    })
}
