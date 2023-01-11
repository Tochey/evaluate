import "../styles/globals.css"
import App, { AppContext } from "next/app"
import { getUser } from "@lib/AuthContext"
import { AuthProvider } from "@lib/AuthContext"
import Navbar from "@components/Navbar"
import { NextPage } from "next"
import api from "@lib/api"
interface IProps {
    Component: NextPage
    pageProps: any
    auth:
        | {
              status: string
              user: any
          }
        | {
              status: string
              user: null
          }
}
function MyApp({ Component, pageProps, auth }: IProps) {
    console.log(api.defaults.baseURL)
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
