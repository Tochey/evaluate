import { prisma } from "@config/prisma.connect"
import prismaErrorWrapper from "@lib/prismaErrorWrapper"
import { NextApiRequest, NextApiResponse } from "next"

export default async function getAllStudents(
    req: NextApiRequest,
    res: NextApiResponse
) {
    return prismaErrorWrapper(res, async () => {
        return await prisma.student.findMany({
            include: {
                courses: true,
                submissions: true,
            },
        })
    })
}
