import { Secret, verify } from "jsonwebtoken"

export default function verifyJwt(token: string) {
    try {
        verify(token, process.env.ACCESS_TOKEN_SECRET as Secret)
        return true
    } catch (err) {
        return false
    }
}
