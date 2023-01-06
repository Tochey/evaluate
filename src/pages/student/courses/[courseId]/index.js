import StudentActivities from "@components/StudentActivities"
import api from "@lib/api"
import { getUser } from "@lib/AuthContext"

export default function Index({ info, submissions }) {
    const {
        instructor: { firstname, lastname },
        activities,
    } = info

    const codingActivityIds = []
    submissions.map((e) => {
        codingActivityIds.push(e.codingActivityId)
    })

    if (activities.length === 0) {
        return (
            <h1 className='text-xl font-bold text-secondary'>
                You have no activities available
            </h1>
        )
    }
    return (
        <div className='flex flex-col items-center gap-10 md:flex-row'>
            {activities.map((e, index) => {
                if (
                    codingActivityIds.includes(
                        e.codingActivity.codingactivityId
                    )
                ) {
                    return (
                        <StudentActivities
                            topic={e.topic}
                            point={e.points}
                            numberOfAttempts={e.numofattempts}
                            isAvailable={false}
                            availableto={e.availableto}
                            activityId={e.activityId}
                            key={index}
                        />
                    )
                } else {
                    return (
                        <StudentActivities
                            topic={e.topic}
                            point={e.points}
                            numberOfAttempts={e.numofattempts}
                            isAvailable={true}
                            availableto={e.availableto}
                            activityId={e.activityId}
                            key={index}
                        />
                    )
                }
            })}
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const {
        user: { sid },
    } = await getUser(ctx)
    const regexExp =
        /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi
    const { courseId } = ctx.query

    if (!regexExp.test(courseId)) {
        return {
            redirect: {
                permanent: false,
                destination: "/student/404",
            },
        }
    }
    let res = await api.get(`api/ops/course/read/${courseId}`)
    const info = res.data

    res = await api.get(`api/ops/student/read/submissions/${sid}`)
    const submissions = res.data.submissions

    if (!info) {
        return {
            redirect: {
                permanent: false,
                destination: "/student/404",
            },
        }
    }

    return {
        props: {
            info,
            submissions,
        },
    }
}
