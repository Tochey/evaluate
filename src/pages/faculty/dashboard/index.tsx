import FacultyCourses from "@components/FacultyCourses"
import api from "@lib/api"
import { getUser } from "@lib/AuthContext"
import { requireFacultyAuthentication } from "@lib/requireAuthentication"
import { faculty, Student } from "@prisma/client"
import { GetServerSidePropsContext } from "next"
import { Course } from "@prisma/client"
import { useRouter } from "next/router"
interface CourseWithStudents extends Course {
    students: Student[]
}

interface IProps {
    courses: CourseWithStudents[]
}
export default function FacultyDashboard({ courses }: IProps) {
    const router = useRouter()
    return (
        <section>
            <div>
                <button
                    className={`mb-5 inline-block rounded border px-4 py-2 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-secondary hover:font-bold`}
                    onClick={() => router.push("/faculty/courses/create")}>
                    Create Course
                </button>
            </div>
            <div className='flex flex-col items-center gap-10 md:flex-row'>
                {courses.map((course, index) => {
                    return (
                        <FacultyCourses
                            key={index}
                            courseId={course.courseId}
                            coursename={course.coursename}
                            accessCode={course.accessCode}
                            academicyear={course.academicyear}
                            numOfStudents={course.students.length}
                        />
                    )
                })}
            </div>
        </section>
    )
}

export const getServerSideProps = requireFacultyAuthentication(
    async (ctx: GetServerSidePropsContext) => {
        const { user, status } = await getUser(ctx)

        const {
            data: { courses },
        } = await api.post("api/ops/faculty/read/getFacultyCourses", {
            fid: (user as faculty).fid,
        })

        return {
            props: {
                courses,
            },
        }
    }
)
