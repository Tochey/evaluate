import "../styles/globals.css"
import App from "next/app"
import { getUser } from "@lib/AuthContext"
import { AuthProvider } from "@lib/AuthContext"
import Navbar from "@components/Navbar"

function MyApp({ Component, pageProps, auth }) {
    return (
        <main className=' bg-primary md:px-20 lg:px-40'>
            <AuthProvider myAuth={auth}>
                {auth.user && <Navbar />}
                <Component {...pageProps} />
            </AuthProvider>
        </main>
    )
}

MyApp.getInitialProps = async (appContext) => {
    const appProps = await App.getInitialProps(appContext)
    const auth = await getUser(appContext.ctx)
    return { ...appProps, auth: auth }
}
export default MyApp
