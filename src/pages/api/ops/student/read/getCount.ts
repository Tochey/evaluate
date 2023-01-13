import prismaErrorWrapper from "@lib/prismaErrorWrapper"
import { prisma } from "@config/prisma.connect"
import { NextApiRequest, NextApiResponse } from "next"

export default async function getStudentCount(req : NextApiRequest, res : NextApiResponse) {
    return prismaErrorWrapper(res, async () => {
        return await prisma.student.count()
    })
}
