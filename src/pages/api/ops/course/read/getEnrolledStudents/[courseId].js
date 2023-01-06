import prismaErrorWrapper from "@lib/prismaErrorWrapper"
import { prisma } from "@config/prisma.connect"

export default function (req, res) {
    const { courseId } = req.query
    return prismaErrorWrapper(res, async () => {
        return prisma.course.findMany({
            where: {
                courseId: courseId,
            },
            select: {
                students: true,
            },
        })
    })
}
