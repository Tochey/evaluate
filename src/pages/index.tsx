import Head from "next/head"
import Link from "next/link"
import { TfiCommentAlt } from "react-icons/tfi"
import { Inter } from "@next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
    return (
        <div className='App'>
            <Head>
                <title>evaluate</title>
                <meta name='description' content='web editor based rce' />
            </Head>

            <div className='flex justify-center pt-8'>
                <div className='mt-4 text-center'>
                    <TfiCommentAlt className=' my-2 text-5xl text-secondary' />
                    <h4 className='my-2 pb-1 text-[30px] font-semibold text-secondary'>
                        Welcome to Evaluate
                    </h4>
                    <Link
                        href={"/login"}
                        className='hover:text-neon_carrot-100 px-3 text-xl font-bold uppercase text-secondary hover:underline'>
                        login
                    </Link>
                    <Link
                        href={"/register"}
                        className='hover:text-neon_carrot-100 px-3 text-xl font-bold uppercase text-secondary hover:underline'>
                        signup
                    </Link>
                </div>
            </div>
        </div>
    )
}
