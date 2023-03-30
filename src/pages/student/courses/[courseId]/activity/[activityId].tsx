import IDE from "@components/codeMirror"
import api from "@lib/api"
import { getUser } from "@lib/AuthContext"
import { requireStudentAuthentication } from "@lib/requireAuthentication"
import { Activity, CodingActivity, Student } from "@prisma/client"
interface IProps {
    activities: Activity & { codingActivity: CodingActivity }
    sid: string
    rememberMeCode: string
}
export default function StudentActivity({
    activities,
    sid,
    rememberMeCode,
}: IProps) {
    const {
        numofattempts,
        codingActivity: { codingactivityId, question, language, testCases },
    } = activities

    return (
        <IDE
            language={language}
            codingActivityId={codingactivityId}
            testCases={testCases}
            sid={sid}
            question={question}
            numofattempts={numofattempts}
        />
    )
}

export const getServerSideProps = requireStudentAuthentication(async (ctx) => {
    const { user } = await getUser(ctx)
    const sid = (user as Student).sid
    const { activityId } = ctx.query
    let res = await api.get(`api/ops/activity/read/${activityId}`)
    const activities = res.data

    return {
        props: { activities, sid },
    }
})
