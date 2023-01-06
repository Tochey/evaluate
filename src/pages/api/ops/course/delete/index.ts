import { prisma } from "@config/prisma.connect"
import prismaErrorWrapper from "@lib/prismaErrorWrapper"
import { NextApiRequest, NextApiResponse } from "next"

export default async function deleteAll(req : NextApiRequest, res : NextApiResponse) {
    return prismaErrorWrapper(res, async () => {
        return await prisma.course.deleteMany({})
    })
}
