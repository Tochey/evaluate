import { verify } from "jsonwebtoken"

export default function verifyJwt(token) {
    try {
        verify(token, process.env.ACCESS_TOKEN_SECRET)
        return true
    } catch (err) {
        return false
    }
}
