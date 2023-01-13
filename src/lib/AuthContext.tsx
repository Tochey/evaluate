import { useContext, createContext } from "react"
import { useRouter } from "next/router"
import api from "./api"
import { faculty, Student } from "@prisma/client"

interface IAuth {
    myAuth: {
        status: "SIGNED_IN" | "SIGNED_OUT"
        user: Pick<Student, "username" | "sid"> | faculty | null
    }
    children: (JSX.Element | null)[]
}
interface IAuthContext {
    auth: {
        status: "SIGNED_IN" | "SIGNED_OUT"
        user: Pick<Student, "username" | "sid"> | faculty | null
    }
    facultyRegister: facultyRegister
    studentLogin: studentLogin
    studentRegister: studentRegister
    facultyLogin: facultyLogin
}

type facultyRegister = (
    facultyId: string,
    firstName: string,
    lastName: string,
    password: string
) => Promise<void | any>

type facultyLogin = (facultyId: string, password: string) => Promise<void | any>
type studentRegister = (
    email: string,
    password: string,
    username: string
) => Promise<void | any>
type studentLogin = (email: string, password: string) => Promise<void | any>

const AuthContext = createContext<IAuthContext>({
    auth: { status: "SIGNED_OUT", user: null },
    facultyRegister: async () => {},
    studentLogin: async () => {},
    studentRegister: async () => {},
    facultyLogin: async () => {},
})

export const getUser = async (ctx: any) => {
    const { req } = ctx
    const isServer = !!req
    const cookies = isServer ? req?.headers.cookie : undefined
    api.defaults.headers.Cookie = ""
    if (isServer && cookies) {
        api.defaults.headers.Cookie = cookies
    }

    return await api
        .get("api/auth/me", {
            withCredentials: true,
        })
        .then(({ data }) => {
            if (data) {
                return { status: "SIGNED_IN", user: data }
            } else {
                return { status: "SIGNED_OUT", user: null }
            }
        })
        .catch((error) => {
            return { status: "SIGNED_OUT", user: null }
        })
}

export const AuthProvider = ({ myAuth, ...props }: IAuth) => {
    const router = useRouter()
    const auth = myAuth || { status: "SIGNED_OUT", user: null }
    const studentLogin: studentLogin = async (email, password) => {
        const data = {
            email,
            password,
        }
        return await api
            .post("api/auth/student/login", data, {
                withCredentials: true,
            })
            .then(() => {
                router.push("/student/dashboard")
            })
            .catch((error: any) => {
                return error
            })
    }
    const facultyLogin: facultyLogin = async (facultyId, password) => {
        const data = {
            facultyId,
            password,
        }
        return await api
            .post("api/auth/faculty/login", data, {
                withCredentials: true,
            })
            .then(() => {
                router.push("/faculty/dashboard")
            })
            .catch((error: any) => {
                return error
            })
    }
    const studentRegister: studentRegister = async (
        email,
        username,
        password
    ) => {
        const data = {
            email,
            username,
            password,
        }
        return await api
            .post("api/auth/student/signup", data, {
                withCredentials: true,
            })
            .then(() => {
                router.push("/login")
            })
            .catch((error: any) => {
                return error
            })
    }

    const facultyRegister: facultyRegister = async (
        facultyId,
        firstName,
        lastName,
        password
    ) => {
        const data = {
            facultyId,
            firstName,
            lastName,
            password,
        }
        return await api
            .post("api/ops/superuser/createFacultyCredentials", data, {
                withCredentials: true,
            })
            .then(function (error: any) {
                console.error(`Something went wrong ${error}`)
            })
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                facultyRegister,
                studentRegister,
                studentLogin,
                facultyLogin,
            }}
            {...props}
        />
    )
}
export const useAuth = () => useContext(AuthContext)
export const AuthConsumer = AuthContext.Consumer
