import { useContext, createContext } from "react"
import { useRouter } from "next/router"
import api from "./api"

const AuthContext = createContext()

export const getUser = async (ctx) => {
    api.defaults.headers = ctx?.req?.headers?.cookie
        ? { cookie: ctx.req.headers.cookie }
        : undefined
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
export const AuthProvider = (props) => {
    const router = useRouter()
    const auth = props.myAuth || { status: "SIGNED_OUT", user: null }
    const studentLogin = async (email, password) => {
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
    const facultyLogin = async (facultyId, password) => {
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
    const studentRegister = async (email, username, password) => {
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
            .then(function (error) {
                console.log(error.message)
            })
    }

    const logout = async () => {
        return await api
            .get(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
                withCredentials: true,
            })
            .then(() => {
                router.push("/")
            })
            .catch((error) => {
                console.error(error.message)
            })
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                logout,
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
