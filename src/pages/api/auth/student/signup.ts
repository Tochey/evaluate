import { prisma } from "@config/prisma.connect"
import hashPassword from "@lib/hashPassword"
import { NextApiRequest, NextApiResponse } from "next"
import { studentSignupValidation } from "@lib/validate"
import _isAvailable from "@lib/_isAvailable"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const error = studentSignupValidation(req.body)
    if (error) return res.status(400).send(error)

    const { username, email, password } = req.body

    try {
        if (await _isAvailable(email)) {
            const newStudent = await prisma.student.create({
                data: {
                    email: email,
                    username: username,
                    password: await hashPassword(password),
                    isEnabled: false,
                    isVerified: false,
                },
            })
            res.status(201).json({ message: newStudent })
        } else
            res.status(400).json({
                message: "email is taken and this account is verified",
            })
    } catch (error: any) {
        console.log(error)
        return res.status(400).json({
            message: error.message,
        })
    }
}
