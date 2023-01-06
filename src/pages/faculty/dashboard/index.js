import { useRouter } from "next/router"
import api from "@lib/api"
import { getUser } from "@lib/AuthContext"

export default function Dashboard({ courses }) {
    const router = useRouter()
    const handleClick = (course) => {
        router.push(`/faculty/courses/${course.courseId}`)
    }

    if (courses.length === 0) {
        return <div className='text-red-800'>You have no courses</div>
    }
    return (
        <div className='text-neon_carrot-100'>
            {courses.map((e) => {
                return (
                    <>
                        <button
                            onClick={() => handleClick(e)}
                            className='text-neon_carrot-100'>
                            {e.coursename} {e.accessCode}
                        </button>
                        <br />
                    </>
                )
            })}
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const { user, status } = await getUser(ctx)

    const {
        data: { courses },
    } = await api.post("api/ops/faculty/read/getFacultyCourses", {
        fid: user.fid,
    })
    console.log(courses)
    return {
        props: {
            courses,
        },
    }
}
