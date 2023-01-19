import prismaErrorWrapper from "@lib/prismaErrorWrapper"
import { prisma } from "@config/prisma.connect"
import { NextApiRequest, NextApiResponse } from "next"

export default function getEnrolledStudents(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { courseId } = req.query
    return prismaErrorWrapper(res, async () => {
        return prisma.course.findMany({
            where: {
                courseId: courseId as string,
            },
            select: {
                students: true,
            },
        })
    })
}
