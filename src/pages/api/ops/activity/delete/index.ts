import { prisma } from "@config/prisma.connect"
import prismaErrorWrapper from "@lib/prismaErrorWrapper"
import { NextApiRequest, NextApiResponse } from "next"

export default function (req  :NextApiRequest, res : NextApiResponse) {
    return prismaErrorWrapper(res, async () => {
        return await prisma.activity.deleteMany({})
    })
}
