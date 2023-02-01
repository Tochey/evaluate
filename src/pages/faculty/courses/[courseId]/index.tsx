import api from "@lib/api"
import { requireFacultyAuthentication } from "@lib/requireAuthentication"
import { Activity } from "@prisma/client"
import { GetServerSidePropsContext } from "next"

interface IProps {
    activities : Activity[]
}

export default function CourseAcivities({activities} : IProps){
    return (
        <div>
            <h1 className="text-green-500">Course Activities</h1>
        </div>
    )
}

export const getServerSideProps = requireFacultyAuthentication(
    async (ctx: GetServerSidePropsContext) => {
        const { courseId } = ctx.query
        const { data } = await api.get(`/api/ops/course/read/${courseId}`)
        const {activities} = data
        return {
            props: {
                activities: activities,
            },
        }
    }
)