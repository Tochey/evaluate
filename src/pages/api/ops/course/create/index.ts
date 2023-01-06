import { prisma } from "@config/prisma.connect"
import prismaErrorWrapper from "@lib/prismaErrorWrapper"
import { NextApiRequest, NextApiResponse } from "next"

export default async function createCourse(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
        coursename,
        academicyear,
        academicterm,
        learningObjectives,
        facultyId,
    } = req.body

    return prismaErrorWrapper(res, async () => {
        return await prisma.course.create({
            data: {
                coursename: coursename,
                academicyear: academicyear,
                academicterm: academicterm,
                learningObjectives: {
                    create: {
                        description: learningObjectives,
                    },
                },
                instructor: {
                    connect: {
                        facultyId: facultyId,
                    },
                },
            },
        })
    })
}
