import { prisma } from "@config/prisma.connect"
import prismaErrorWrapper from "@lib/prismaErrorWrapper"
import { NextApiRequest, NextApiResponse } from "next"

export default async function getStudentCourses(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { sid } = req.body
    return prismaErrorWrapper(res, async () => {
        return await prisma.student.findUnique({
            where: {
                sid: sid,
            },
            include: {
                courses: {
                    select: {
                        courseId: true,
                        coursename: true,
                        academicterm: true,
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
                    },
                },
            },
        })
    })
}
