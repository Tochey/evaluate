import salemstate from "../public/salemstate.jpeg"
import Link from "next/link"
import Image from "next/image"
import { Prisma } from "@prisma/client"

interface IProps {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    handleSubmit: React.MouseEventHandler<HTMLButtonElement>
    redir: string
    emailPlaceHolder: string
    identity: string
    inputName: string
    error: string
}

export default function Login({
    inputName,
    error,
    handleChange,
    handleSubmit,
    redir,
    identity,
    emailPlaceHolder,
}: IProps) {
    return (
        <section className='gradient-form h-full text-white md:h-screen '>
            <div className='container mx-auto h-full py-12 px-6 '>
                <div className='g-6 flex h-full flex-wrap items-center justify-center text-gray-800'>
                    <div className='xl:w-10/12'>
                        <div className='block rounded-lg shadow-lg'>
                            <div className='g-0 lg:flex lg:flex-wrap'>
                                <div className='border-l border-t border-b border-secondary px-4 md:px-0 lg:w-6/12'>
                                    <div className='md:mx-6 md:p-12'>
                                        <div className='text-center'>
                                            <h4 className='mt-1 mb-12 pb-1 text-xl font-semibold text-secondary'>
                                                Welcome to Evaluate
                                            </h4>
                                        </div>
                                        <form>
                                            <p className='mb-4 text-secondary '>
                                                Please login to your account
                                            </p>

                                            <div className='mb-4'>
                                                <input
                                                    type='text'
                                                    name={inputName}
                                                    className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
                                                    id='exampleFormControlInput1'
                                                    placeholder={
                                                        emailPlaceHolder
                                                    }
                                                    onChange={(e) =>
                                                        handleChange(e)
                                                    }
                                                />
                                            </div>
                                            <div className='mb-4'>
                                                <input
                                                    type='password'
                                                    name='password'
                                                    className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
                                                    id='exampleFormControlInput2'
                                                    placeholder='Password'
                                                    onChange={(e) =>
                                                        handleChange(e)
                                                    }
                                                />
                                            </div>
                                            {error && (
                                                <p className=' text-red-500'>
                                                    {error}
                                                </p>
                                            )}
                                            <div className='mb-12 pt-1 pb-1 text-center'>
                                                <button
                                                    className='my-3 inline-block rounded border px-4 py-2 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-secondary hover:font-bold'
                                                    type='button'
                                                    onClick={handleSubmit}>
                                                    Log in
                                                </button>

                                                <p className='text-secondary'>
                                                    {identity == "Student"
                                                        ? "Faculty"
                                                        : "Student"}
                                                    ?{" "}
                                                    <span>
                                                        <Link
                                                            href={redir}
                                                            className='hover:text-neon_carrot-100 hover:underline'>
                                                            Sign in here
                                                        </Link>
                                                    </span>
                                                </p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className=' lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none'>
                                    <Image
                                        src={salemstate}
                                        className='h-full'
                                        alt='picture of salem state'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
