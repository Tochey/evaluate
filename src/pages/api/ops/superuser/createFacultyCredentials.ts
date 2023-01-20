import { facultyCredentialsValidation } from "@lib/validate"
import { prisma } from "@config/prisma.connect"
import hashPassword from "@lib/hashPassword"
import { NextApiRequest, NextApiResponse } from "next"

export default async function createFacultyCredentials(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const error = facultyCredentialsValidation(req.body)
    if (error) return res.status(400).send(error)

    const { facultyId, fullname, password } = req.body

    try {
        const newFaculty = await prisma.faculty.create({
            data: {
                facultyId: facultyId,
                fullName : fullname,
                password: await hashPassword(password),
            },
        })
        return res.status(201).json({ message: newFaculty })
    } catch (error: any) {
        return res.status(400).json({
            message: error.message,
        })
    }
}
