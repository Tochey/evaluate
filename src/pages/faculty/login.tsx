import Login from "@components/Login"
import { useAuth } from "@lib/AuthContext"
import { useRouter } from "next/router"
import { ChangeEvent, MouseEvent, useState } from "react"

export default function FacultyLogin() {
    const [data, setData] = useState({ facultyId: "", password: "" })
    const [error, setError] = useState<string>("")
    const { facultyLogin } = useAuth()

    const handleFacultyChange: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const handleFacultySubmit: React.MouseEventHandler<
        HTMLButtonElement
    > = async (e) => {
        setError("")
        e.preventDefault()

        const { facultyId, password } = data
        const error = await facultyLogin(facultyId, password)
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
            redir={"/login"}
            emailPlaceHolder={"Please Enter Faculty Id #"}
            identity={"Faculty"}
            inputName={"facultyId"}
            error={error}
            handleChange={handleFacultyChange}
            handleSubmit={handleFacultySubmit}
        />
    )
}
