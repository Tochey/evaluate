import { useState, useEffect } from "react"
import CodeUi from "@components/codeMirror"
import api from "@lib/api"
import { getUser } from "@lib/AuthContext"
import { GetServerSideProps, GetServerSidePropsContext } from "next/types"
import { Activity, CodingActivity } from "@prisma/client"
interface IProps {
    activities: Activity & { codingActivity: CodingActivity }
    sid: string
}
export default function StudentActivity({ activities, sid }: IProps) {
    const {
        numofattempts,
        codingActivity: { codingactivityId, question, language, skeletonCode },
    } = activities

    return (
        <div className='flex justify-center'>
            <div className='App'>
                <h1 className='text-xl text-white'>
                    Welcome this is a coding activity in{" "}
                    <span className='font-bold text-secondary'>{language}</span>
                </h1>
                <p className='text-xl text-white'>
                    The questions is :{" "}
                    <span className='text-2xl font-bold text-secondary'>
                        {question}
                    </span>
                </p>
            </div>
            <CodeUi
                language={language}
                codingActivityId={codingactivityId}
                skeletonCode={skeletonCode}
                sid={sid}
            />
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (
    ctx: GetServerSidePropsContext
) => {
    const {
        user: { sid },
    } = await getUser(ctx)
    const { activityId } = ctx.query
    let res = await api.get(`api/ops/activity/read/${activityId}`)
    const activities = res.data

    return {
        props: { activities, sid },
    }
}
