import prismaErrorWrapper from "@lib/prismaErrorWrapper"
import { prisma } from "@config/prisma.connect"

export default async function getStudentCount(req, res) {
    return prismaErrorWrapper(res, async () => {
        return await prisma.student.count()
    })
}
