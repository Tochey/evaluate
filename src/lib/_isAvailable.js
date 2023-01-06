import { prisma } from "../config/prisma.connect"

//checks if student credentials can be allocated to others
export default async function _isAvailable(email) {
    const student = await prisma.student.findUnique({
        where: {
            email: email,
        },
    })

    if (student && student.isVerified) return false
    if (student && !student.isVerified) {
        await prisma.student.delete({
            where: {
                email: email,
            },
        })

        return true
    }

    return !student ? true : false
}
