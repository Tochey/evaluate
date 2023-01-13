import { prisma } from "@config/prisma.connect"
import prismaErrorWrapper from "@lib/prismaErrorWrapper"
import { NextApiRequest, NextApiResponse } from "next"

export default async function getStudentSubmission(req : NextApiRequest, res : NextApiResponse) {
    const { sid } = req.query
    return prismaErrorWrapper(res, async () => {
        return await prisma.student.findFirst({
            where: {
                sid: sid as string,
            },
            select: {
                submissions: true,
            },
        })
    })
}
