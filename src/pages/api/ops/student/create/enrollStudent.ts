import { prisma } from "@config/prisma.connect"
import prismaErrorWrapper from "@lib/prismaErrorWrapper"
import { NextApiRequest, NextApiResponse } from "next"

export default function enrollStudentInCourse(req: NextApiRequest, res: NextApiResponse) {
    const { sid, courseId } = req.body
    return prismaErrorWrapper(res, async () => {
        return prisma.student.update({
            where: {
                sid: sid,
            },
            data: {
                courses: {
                    connect: {
                        courseId: courseId,
                    },
                },
            },
        })
    })
}
