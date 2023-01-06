import { sign } from "jsonwebtoken"

export const createAccessToken = (id, role) => {
    return sign({ id: id, role: role }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_REFRESH_TIME,
    })
}
