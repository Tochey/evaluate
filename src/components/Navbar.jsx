import { BsFillMoonStarsFill } from "react-icons/bs"
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import Link from "next/link"
export default function Navbar() {
    const router = useRouter()
    return (
        <section className=''>
            <nav className='md:py mb-10 flex justify-evenly py-7'>
                <h1 className='text-xl font-bold text-secondary '>
                    <Link href='/student/dashboard'>Evaluate</Link>
                </h1>
                <ul className='flex items-center gap-10'>
                    <li>
                        <BsFillMoonStarsFill className='cursor-pointer text-2xl text-secondary' />
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
