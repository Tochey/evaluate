import { useState } from "react"
import { getUser, useAuth } from "@lib/AuthContext"
import Register from "@components/Register"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { Student } from "@prisma/client"

export default function StudentRegister() {
    const [data, setData] = useState({
        email: "",
        username: "",
        password: "",
        fullname: "",
    })
    const [error, setError] = useState("")
    const { studentRegister } = useAuth()

    const handleChange: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const studentRegisterSubmit: React.MouseEventHandler<
        HTMLButtonElement
    > = async (e) => {
        e.preventDefault()

        const { email, username, password, fullname } = data

        const error = await studentRegister(email, username, password, fullname)

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

export const getServerSideProps: GetServerSideProps = async (
    ctx: GetServerSidePropsContext
) => {
    const res = await getUser(ctx)
    if (res.status === "SIGNED_OUT") {
        return {
            props: {},
        }
    }

    if (res.user?.role) {
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

        if (status === "SIGNED_IN" && role === "FACULTY") {
            return {
                redirect: {
                    permanent: false,
                    destination: "/facutly/dashboard",
                },
            }
        }
    }
    return {
        props: {},
    }
}
