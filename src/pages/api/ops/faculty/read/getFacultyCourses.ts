import { prisma } from "@config/prisma.connect"
import prismaErrorWrapper from "@lib/prismaErrorWrapper"
import { NextApiRequest, NextApiResponse } from "next"

export default function getFacultyCourses(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { fid } = req.body

    return prismaErrorWrapper(res, async () => {
        return await prisma.faculty.findUnique({
            where: {
                fid: fid,
            },
            select: {
                courses: {
                    include: {
                        students: true,
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                },
            },
        })
    })
}
