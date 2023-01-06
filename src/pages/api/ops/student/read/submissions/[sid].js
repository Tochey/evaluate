import { prisma } from "@config/prisma.connect"
import prismaErrorWrapper from "@lib/prismaErrorWrapper"

export default async function (req, res) {
    const { sid } = req.query
    return prismaErrorWrapper(res, async () => {
        return await prisma.student.findFirst({
            where: {
                sid: sid,
            },
            select: {
                submissions: true,
            },
        })
    })
}
