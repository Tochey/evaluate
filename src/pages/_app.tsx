import "../styles/globals.css"
import App, { AppContext } from "next/app"
import { getUser } from "@lib/AuthContext"
import { AuthProvider } from "@lib/AuthContext"
import Navbar from "@components/Navbar"
import { faculty, Student } from "@prisma/client"
interface IProps {
    pageProps: any
    auth: {
        status: "SIGNED_IN" | "SIGNED_OUT"
        user: Student | faculty | null
    }
}
function MyApp({ Component, pageProps, auth }: AppContext & IProps) {
    return (
        <main className=' bg-primary md:px-20 lg:px-40'>
            <AuthProvider myAuth={auth}>
                {auth.user && <Navbar />}
                <Component {...pageProps} />
            </AuthProvider>
        </main>
    )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
    const appProps = await App.getInitialProps(appContext)
    const auth = await getUser(appContext.ctx)
    return { ...appProps, auth: auth }
}

export default MyApp
