import { genSalt, hash } from "bcrypt"

export default async function hashPassword(password: string) {
    const generateHash = await genSalt(Number(process.env.SALT))
    return await hash(password, generateHash)
}
