import { prisma } from "../../../../config/prisma.connect"
import bcrypt from "bcrypt"
import { createAccessToken } from "@lib/auth"
import { serialize } from "cookie"
import { facultyLoginValidation } from "@lib/validate"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const error = facultyLoginValidation(req.body)
    if (error) return res.status(400).send(error)

    const { facultyId, password } = req.body

    const faculty = await prisma.faculty.findUnique({
        where: {
            facultyId: facultyId,
        },
    })

    if (faculty) {
        const checkPassword = await bcrypt.compare(password, faculty.password)
        if (!checkPassword) {
            return res.status(401).json("incorrect email or password")
        } else {
            const serialized = serialize(
                "evaluate",
                createAccessToken(faculty.fid, faculty.role),
                {
                    httpOnly: false,
                    sameSite: "strict",
                    secure: process.env.NODE_ENV === "production",
                    maxAge: 60 * 60 * 24 * 7, // expires in 1 week
                    path: "/",
                }
            )

            res.setHeader("Set-Cookie", serialized)
            return res.status(201).json("login successful")
        }
    } else {
        return res.status(404).json("account does not exist")
    }
}
