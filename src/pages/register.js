import { useState } from "react"
import { getUser, useAuth } from "@lib/AuthContext"
import Register from "@components/Register"

export default function StudentRegister() {
    const [data, setData] = useState({ email: "", username: "", password: "" })
    const [error, setError] = useState("")
    const { studentRegister } = useAuth()

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const studentRegisterSubmit = async (e) => {
        e.preventDefault()

        const { email, username, password } = data

        const error = await studentRegister(email, username, password)

        if (
            error?.response &&
            error?.response.status >= 400 &&
            error?.response.status <= 500
        ) {
            setError(error.response.data)
        }
    }

    return (
        <Register
            handleChange={handleChange}
            handleSubmit={studentRegisterSubmit}
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
