import { prisma } from "@config/prisma.connect"
import prismaErrorWrapper from "@lib/prismaErrorWrapper"
import { NextApiRequest, NextApiResponse } from "next"

export default async function createActivity(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
        topic,
        availableto,
        courseId,
        testCases,
        language,
        question,
        learningObjectives,
    } = req.body

    return prismaErrorWrapper(res, async () => {
        return await prisma.activity.create({
            data: {
                topic: topic,
                availableto: availableto,
                course: {
                    connect: {
                        courseId: courseId, //replace with courseId
                    },
                },
                learningObjectives: {
                    create: {
                        description: learningObjectives,
                    },
                },
                codingActivity: {
                    create: {
                        question: question,
                        testCases: testCases,
                        language: language,
                    },
                },
            },
        })
    })
}
