import { prisma } from "@config/prisma.connect"
import prismaErrorWrapper from "@lib/prismaErrorWrapper"
import { NextApiRequest, NextApiResponse } from "next"

export default async function deleteActivityById(req: NextApiRequest, res: NextApiResponse) {
    const { activityId } = req.query

    return prismaErrorWrapper(res, async () => {
        return await prisma.activity.delete({
            where: {
                activityId: activityId as string,
            },
            include: {
                codingActivity: true,
                course: true,
                learningObjectives: true,
            },
        })
    })
}
