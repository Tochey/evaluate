import { prisma } from "@config/prisma.connect"
import prismaErrorWrapper from "@lib/prismaErrorWrapper"
import { NextApiRequest, NextApiResponse } from "next"

export default async function (req : NextApiRequest, res : NextApiResponse) {
    const { sid } = req.query
    return prismaErrorWrapper(res, async () => {
        return await prisma.student.delete({
            where: {
                sid: sid as string,
            },
        })
    })
}
