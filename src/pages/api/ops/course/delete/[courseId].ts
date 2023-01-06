import { prisma } from "@config/prisma.connect"
import prismaErrorWrapper from "@lib/prismaErrorWrapper"
import { NextApiRequest, NextApiResponse } from "next"

export default function (req: NextApiRequest, res: NextApiResponse) {
    const { courseId } = req.query

    return prismaErrorWrapper(res, async () => {
        return await prisma.course.delete({
            where: {
                courseId: courseId as string,
            },
        })
    })
}
