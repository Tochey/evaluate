import { useState } from "react"
import { useRouter } from "next/router"
import { useAuth } from "@lib/AuthContext"
import Login from "@components/Login"

export default function FacltyLogin() {
    const [data, setData] = useState({ facultyId: "", password: "" })
    const [error, setError] = useState("")
    const { facultyLogin } = useAuth()

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { facultyId, password } = data
            const {
                data: { accessToken },
            } = await facultyLogin(facultyId, password)
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
            }
        }
    }

    return (
        <Login
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            redir={"/login"}
            emailPlaceHolder={"Enter your Faculty Identification Number"}
            identity='Faculty'
            inputName='facultyId'
        />
    )
}
