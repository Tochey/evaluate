import { useState } from "react"
import { useRouter } from "next/router"
import { getUser, useAuth } from "@lib/AuthContext"
import Login from "@components/Login"

export default function StudentLogin() {
    const router = useRouter()
    const [data, setData] = useState({ email: "", password: "" })
    const [error, setError] = useState([])
    const { studentLogin } = useAuth()

    const handleStudentChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const handleStudentSubmit = async (e) => {
        setError("")
        e.preventDefault()

        const { email, password } = data
        const error = await studentLogin(email, password)
        if (
            error?.response &&
            error?.response.status >= 400 &&
            error?.response.status <= 500
        ) {
            setError(error.response.data)
        }
    }

    return (
        <Login
            handleChange={handleStudentChange}
            handleSubmit={handleStudentSubmit}
            redir={"/faculty/login"}
            emailPlaceHolder={"Enter your SSU email"}
            identity='Student'
            inputName='email'
            error={error}
        />
    )
}

export async function getServerSideProps(ctx) {
    const res = await getUser(ctx)
    if (res.status === "SIGNED_OUT") {
        return {
            props: {},
        }
    }
    const {
        status,
        user: { role },
    } = res
    if (status === "SIGNED_IN" && role === "STUDENT") {
        return {
            redirect: {
                permanent: false,
                destination: "/student/dashboard",
            },
        }
    }
    return {
        props: {},
    }
}
