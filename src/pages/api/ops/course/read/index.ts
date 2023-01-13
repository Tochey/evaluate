import prismaErrorWrapper from "@lib/prismaErrorWrapper"
import { prisma } from "@config/prisma.connect"
import { NextApiRequest, NextApiResponse } from "next"

export default async function getAllCourses(
    req: NextApiRequest,
    res: NextApiResponse
) {
    return prismaErrorWrapper(res, async () => {
        return await prisma.course.findMany({
            include: {
                students: {
                    select: {
                        email: true,
                    },
                },
                learningObjectives: {
                    select: {
                        description: true,
                    },
                },
                instructor: {
                    select: {
                        firstName: true,
                    },
                },
                activities: {
                    select: {
                        topic: true,
                    },
                },
            },
        })
    })
}
