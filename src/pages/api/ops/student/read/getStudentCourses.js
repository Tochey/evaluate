import { prisma } from "@config/prisma.connect"
import prismaErrorWrapper from "@lib/prismaErrorWrapper"

export default async function (req, res) {
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
                                firstName: true,
                                lastName: true,
                            },
                        },
                    },
                },
            },
        })
    })
}
