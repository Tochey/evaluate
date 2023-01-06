import { prisma } from "@config/prisma.connect"
import prismaErrorWrapper from "@lib/prismaErrorWrapper"
import { NextApiRequest, NextApiResponse } from "next"

export default function (req : NextApiRequest, res : NextApiResponse) {
    const { fid } = req.body

    return prismaErrorWrapper(res, async () => {
        return await prisma.faculty.findUnique({
            where: {
                fid: fid,
            },
            select: {
                courses: true,
            },
        })
    })
}
