import { prisma } from "@config/prisma.connect"
import prismaErrorWrapper from "@lib/prismaErrorWrapper"
import { NextApiRequest, NextApiResponse } from "next"

export default async function getSubmissions(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { codingActivityId } = req.query

    return prismaErrorWrapper(res, async () => {
        return await prisma.codingActivity.findUnique({
            where: {
                codingactivityId: codingActivityId as string,
            },
            select: {
                question: true,
                submissions: {
                    include: {
                        student: {
                            select: {
                                email: true,
                                username: true,
                            },
                        },
                    },
                },
            },
        })
    })
}
