import { useRouter } from "next/router"
import { useEffect } from "react"
import { useAuth } from "./AuthContext"

export default function ProtectedRoute({ children }: any) {
    const router = useRouter()
    const { auth } = useAuth()
    const isNotAllowedPage = !['/login', '/'].includes(router.pathname);

    useEffect(() => {
        console.log({
           route :  router.pathname,
        })
        if (auth.status === "SIGNED_OUT"  && isNotAllowedPage) router.push("/login")
    }, [])

    return children
}
