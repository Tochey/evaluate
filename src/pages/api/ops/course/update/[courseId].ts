import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"
import prismaErrorWrapper from "@lib/prismaErrorWrapper"
const prisma = new PrismaClient()

export default async function editCourse(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { courseId } = req.query

    const { coursename, academicyear, academicterm, learningObjectives } =
        req.body

    return prismaErrorWrapper(res, async () => {
        return await prisma.course.update({
            where: { courseId: courseId as string },
            data: {
                coursename,
                academicyear,
                academicterm,
                learningObjectives: {
                    update: {
                        description: learningObjectives,
                    },
                },
            },
        })
    })
}
