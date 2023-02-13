import FacultyActivities from "@components/FacultyActivities"
import api from "@lib/api"
import { requireFacultyAuthentication } from "@lib/requireAuthentication"
import { Activity } from "@prisma/client"
import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"

interface IProps {
    activities: Activity[],
    courseId: string
}

export default function CourseAcivities({ activities, courseId }: IProps) {
    const router = useRouter()
    return (
        <section>
              <div>
                <button
                    className={`mb-5 inline-block rounded border px-4 py-2 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-secondary hover:font-bold`}
                    onClick={() => router.push(`${router.asPath}/activity/create`)}>
                    Create Activity
                </button>
            </div>
            <div>
            <FacultyActivities />
        </div>
        </section>
    )
}

export const getServerSideProps = requireFacultyAuthentication(
    async (ctx: GetServerSidePropsContext) => {
        const { courseId } = ctx.query
        const { data } = await api.get(`/api/ops/course/read/${courseId}`)
        const { activities } = data
        return {
            props: {
                courseId : courseId,
                activities: activities,
            },
        }
    }
)
