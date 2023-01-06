import bcrypt from "bcrypt"
import { serialize } from "cookie"
import { createAccessToken } from "@lib/auth"
import { studentLoginValidation } from "@lib/validate"
import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@config/prisma.connect"

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
    const error = studentLoginValidation(req.body)
    if (error) return res.status(400).send(error)

    const { email, password } = req.body
    const student = await prisma.student.findUnique({
        where: {
            email: email,
        },
    })

    if (student) {
        const checkPassword = await bcrypt.compare(password, student.password)
        if (!checkPassword) {
            return res.status(401).json("Incorrect Password")
        } else {
            const atCookie = serialize(
                "evaluate",
                createAccessToken(student.sid, student.role),
                {
                    httpOnly: false,
                    sameSite: "strict",
                    maxAge: 60 * 60 * 24 * 7, // expires in 1 week
                    path: "/",
                }
            )
            res.setHeader("Set-Cookie", atCookie)
            return res.status(200).json("logging in")
        }
    } else {
        return res.status(404).json("account does not exist")
    }
}
