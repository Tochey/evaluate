import { prisma } from "@config/prisma.connect"
import prismaErrorWrapper from "@lib/prismaErrorWrapper"
import { NextApiRequest, NextApiResponse } from "next"

export default async function deleteAllCourses(
    req: NextApiRequest,
    res: NextApiResponse
) {
    return prismaErrorWrapper(res, async () => {
        return await prisma.course.deleteMany({})
    })
}
