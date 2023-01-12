import { useContext, createContext } from "react"
import { useRouter } from "next/router"
import api from "./api"
import { GetServerSidePropsContext, NextPageContext } from "next"
import { faculty, Student } from "@prisma/client"

interface IAuth {
    myAuth: {
        status: "SIGNED_IN" | "SIGNED_OUT"
        user: Student | faculty | null
    }
    children: (JSX.Element | null)[]
}
const AuthContext = createContext({studentRegister: (email: string, username: string, password: string) => Promise<void>, studentLogin: (email: string, password: string) => Promise<void>})
export const getUser = async (ctx: GetServerSidePropsContext) => {
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
    const auth = myAuth || { status: "SIGNED_OUT", user: null, children: [] }
    const studentLogin = async (email: string, password: string) => {
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
            .catch((error) => {
                return error
            })
    }
    const facultyLogin = async (
        facultyId: string,
        password: string
    ): Promise<void> => {
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
            .catch((error) => {
                console.error("Incorrect email or password entered.")
            })
    }
    const studentRegister = async (
        email: string,
        username: string,
        password: string
    ): Promise<void> => {
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
            .catch(function (error) {
                return error
            })
    }

    const facultyRegister = async (
        facultyId: string,
        firstName: string,
        lastName: string,
        password: string
    ): Promise<void> => {
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
                console.log(error.message)
            })
    }

    return (
        <AuthContext.Provider
            value={{
                myAuth,
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
