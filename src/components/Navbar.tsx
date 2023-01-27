import { BsFillMoonStarsFill } from "react-icons/bs"
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@lib/AuthContext"
import { faculty, Student } from "@prisma/client"

export default function Navbar() {
    const router = useRouter()
    const { auth } = useAuth()

    if (router.asPath === "/") {
        return null
    }

    return (
        <section className=''>
            <nav className='md:py mb-10 flex justify-evenly py-7'>
                <h1 className='text-xl font-bold text-secondary '>
                    {auth.user!.role === "STUDENT" ? (
                        <Link href='/student/dashboard'>Evaluate</Link>
                    ) : (
                        <Link href='/faculty/dashboard'>Evaluate</Link>
                    )}
                </h1>
                <ul className='flex items-center gap-10'>
                    <li>
                        <BsFillMoonStarsFill className='cursor-pointer text-2xl text-secondary' />
                    </li>
                    <li>
                        <Image
                            src={`https://api.dicebear.com/5.x/initials/svg?seed=${
                                auth.user!.role === "STUDENT"
                                    ? (auth.user as Student).fullName
                                    : (auth.user as faculty).fullName
                            }`}
                            alt='avatar'
                            width={50}
                            height={50}
                        />
                    </li>
                    <li>
                        <Link
                            href='#'
                            onClick={() => {
                                Cookies.remove("evaluate")
                                router.push("/login")
                            }}
                            className=' inline-block rounded border px-4 py-2 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-secondary hover:font-bold'>
                            Logout
                        </Link>
                    </li>
                </ul>
            </nav>
        </section>
    )
}
