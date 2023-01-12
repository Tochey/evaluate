import StudentActivities from "@components/StudentActivities"
import api from "@lib/api"
import { getUser } from "@lib/AuthContext"
import { GetServerSideProps, GetServerSidePropsContext } from "next/types"
import {
    Course,
    Submission,
    faculty,
    Activity,
    CodingActivity,
} from "@prisma/client"

interface IProps {
    courseInfo: Course & { instructor: faculty } & {
        activities: Array<Activity & { codingActivity: CodingActivity }>
    }
    submissions: Submission[]
}
export default function Index({ courseInfo, submissions }: IProps) {
    const {
        instructor: { firstName, lastName },
        activities,
    } = courseInfo

    const codingActivityIds: string[] = []
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
            {activities.map((e, index: number) => {
                if (
                    codingActivityIds.includes(
                        e.codingActivity.codingactivityId
                    )
                ) {
                    return (
                        <StudentActivities
                            topic={e.topic}
                            points={e.points}
                            numofattempts={e.numofattempts}
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
                            points={e.points}
                            numofattempts={e.numofattempts}
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

export const getServerSideProps: GetServerSideProps = async (
    ctx: GetServerSidePropsContext
) => {
    const {
        user: { sid },
    } = await getUser(ctx)
    const regexExp =
        /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi
    const { courseId } = ctx.query
    1
    if (!regexExp.test(courseId as string)) {
        return {
            redirect: {
                permanent: false,
                destination: "/student/404",
            },
        }
    }
    let res = await api.get(`api/ops/course/read/${courseId}`)
    const courseInfo = res.data

    res = await api.get(`api/ops/student/read/submissions/${sid}`)
    const submissions = res.data.submissions

    if (!courseInfo) {
        return {
            redirect: {
                permanent: false,
                destination: "/student/404",
            },
        }
    }

    return {
        props: {
            courseInfo,
            submissions,
        },
    }
}
