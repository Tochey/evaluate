import api from "@lib/api"
import { getUser, useAuth } from "@lib/AuthContext"
import { useRouter } from "next/router"
import { useState } from "react"
import StudentCourses from "@components/StudentCourses"

export default function Home({ courses }) {
    const { auth } = useAuth()
    const router = useRouter()
    const [accessCode, setAccessCode] = useState("")
    const [error, setError] = useState()
    const {
        user: { username, sid },
    } = auth

    const handleChange = ({ currentTarget: input }) => {
        setAccessCode(input.value)
    }

    const handleEnroll = async (e) => {
        e.preventDefault()
        try {
            const { data } = await api.post(
                `api/ops/course/update/enroll/${sid}`,
                {
                    accessCode: accessCode,
                }
            )
            setAccessCode("")
            window.location.reload()
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data)
            }
        }
    }

    const handleClick = (courseId) => {
        router.push(`/student/courses/${courseId}`)
    }

    return (
        <section>
            {courses.length !== 0 ? (
                <>
                    <h1 className='text-center text-xl font-bold text-white md:text-start'>
                        Welcome{" "}
                        <span className='font-bold uppercase text-secondary'>
                            {username}
                        </span>
                        , Here are your courses:{" "}
                    </h1>
                    <div className=''>
                        <div className='flex flex-col items-center gap-10 md:flex-row'>
                            {courses.map((course, index) => {
                                return (
                                    <StudentCourses
                                        key={index}
                                        coursename={course.coursename}
                                        academicterm={course.academicterm}
                                        instructor={course.instructor}
                                        lOBJ={course.learningObjectives[0]}
                                        handleClick={() =>
                                            handleClick(course.courseId)
                                        }
                                    />
                                )
                            })}
                        </div>
                    </div>
                </>
            ) : (
                <div>
                    <h1 className=' text-xl font-bold text-secondary'>
                        Please Contact your instructor for an Access Code to
                        enroll in a course
                    </h1>
                </div>
            )}
            <div className='mt-10 text-center'>
                <input
                    type='text'
                    placeholder='Course Access Code'
                    className='rounded-sm border border-white bg-black py-2 px-3 text-white outline-none'
                    onChange={handleChange}
                    value={accessCode}
                />
                <button
                    className='ml-3 inline-block rounded border px-4 py-2 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-secondary hover:font-bold'
                    onClick={(e) => handleEnroll(e)}>
                    Enroll
                </button>
                {error && (
                    <div className='py-3 font-bold text-secondary'>{error}</div>
                )}
            </div>
        </section>
    )
}

export async function getServerSideProps(ctx) {
    const { user, status } = await getUser(ctx)

    if (status == "SIGNED_OUT") {
        return {
            redirect: {
                permanent: false,
                destination: "/login",
            },
        }
    }
    const {
        data: { courses },
    } = await api.post("api/ops/student/read/getStudentCourses", {
        sid: user.sid,
    })

    return {
        props: {
            courses,
        },
    }
}
