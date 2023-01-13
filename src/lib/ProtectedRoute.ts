import { useRouter } from "next/router"
import { useEffect } from "react"
import { useAuth } from "./AuthContext"

export default function ProtectRoute({ children } : any) {
    const router = useRouter()
    const { auth } = useAuth()

    useEffect(() => {
        console.log(auth.status)
        if (auth.status === "SIGNED_OUT")  router.push("/login")
    }, [])
    
    return children
}
