import { prisma } from "@config/prisma.connect"
import prismaErrorWrapper from "@lib/prismaErrorWrapper"
import { NextApiRequest, NextApiResponse } from "next"

export default async function getCourseById(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { courseId } = req.query

    return prismaErrorWrapper(res, async () => {
        return await prisma.course.findUnique({
            where: {
                courseId: courseId as string,
            },
            include: {
                learningObjectives: {
                    select: {
                        description: true,
                    },
                },
                instructor: {
                    select: {
                        fullName: true,
                    },
                },
                activities: {
                    select: {
                        activityId: true,
                        topic: true,
                        points: true,
                        numofattempts: true,
                        // availablefrom: true,
                        availableto: true,
                        codingActivity: {
                            include : {
                                submissions : true
                            }
                        },
                    },
                    orderBy: {
                        availablefrom: "asc",
                    },
                },
            },
        })
    })
}
