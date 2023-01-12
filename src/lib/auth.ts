import { Secret, sign } from "jsonwebtoken"

export const createAccessToken = (id: string, role: string) => {
    return sign(
        { id: id, role: role },
        process.env.ACCESS_TOKEN_SECRET as Secret,
        {
            expiresIn: process.env.ACCESS_TOKEN_REFRESH_TIME,
        }
    )
}
