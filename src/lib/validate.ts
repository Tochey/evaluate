import { fromZodError } from "zod-validation-error"

const z = require("zod")

export function studentSignupValidation(data: {}) {
    const registerValidationSchema = z.object({
        username: z
            .string()
            .min(5, "Username must be 6 characters or more")
            .max(32, "Username is too long")
            .trim(),
        email: z
            .string()
            .email("Please Input a valid email that ends in .edu")
            .endsWith(".edu")
            .trim(),
        password: z
            .string()
            .min(8, "Password must be 8 or more characters")
            .max(16, "Password is too long")
            .trim(),
    })
    try {
        registerValidationSchema.parse(data)
    } catch (err: any) {
        return fromZodError(err).message
    }
}

export function studentLoginValidation(data: string) {
    const loginValidationSchema = z.object({
        email: z.string().email().endsWith(".edu").trim(),
        password: z
            .string()
            .min(1, "Password must be 8 or more characters")
            .max(16, "Password is too long")
            .trim(),
    })
    try {
        loginValidationSchema.parse(data)
    } catch (err: any) {
        return fromZodError(err).message
    }
}

export function facultyCredentialsValidation(data: string) {
    const registerValidationSchema = z.object({
        facultyId: z.string().length(4, "Invalid faculty Id").trim(),
        firstName: z.string().trim(),
        lastName: z.string().trim(),
        password: z
            .string()
            .min(8, "Password must be 8 or more characters")
            .max(12, "Password is too long")
            .trim(),
    })
    try {
        registerValidationSchema.parse(data)
    } catch (err: any) {
        return fromZodError(err).message
    }
}

export function facultyLoginValidation(data: string) {
    const loginValidationSchema = z.object({
        facultyId: z.string().length(4, "Invalid faculty Id").trim(),
        password: z
            .string()
            .min(8, "Password must be 8 or more characters")
            .max(12, "Password is too long")
            .trim(),
    })
    try {
        loginValidationSchema.parse(data)
    } catch (err: any) {
        return fromZodError(err).message
    }
}
