import { prisma } from "@config/prisma.connect"
import prismaErrorWrapper from "@lib/prismaErrorWrapper"
import { NextApiRequest, NextApiResponse } from "next"

export default async function enrollInCourse(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const regexExp =
        /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi
    const { sid } = req.query
    const { accessCode } = req.body

    if (!regexExp.test(accessCode)) {
        return res
            .status(400)
            .json("Invalid Access Code, Contact your instructor")
    }
    return prismaErrorWrapper(res, async () => {
        return await prisma.course.update({
            where: {
                accessCode: accessCode,
            },
            data: {
                students: {
                    connect: {
                        sid: sid as string,
                    },
                },
            },
        })
    })
}
