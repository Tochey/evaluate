import { Activity, CodingActivity, Submission } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import router from "next/router"
import { useState } from "react"
import { BsTrash, BsFillPersonFill } from "react-icons/bs"
import { FiEdit } from "react-icons/fi"
import { ImCheckmark } from "react-icons/im"
import { RiCloseCircleFill } from "react-icons/ri"
import moment from "moment"
import api from "@lib/api"

type IProps = Pick<
    Activity,
    "topic" | "points" | "numofattempts" | "availableto" | "activityId"
> & { courseId: String } & { codingActivity: CodingActivity } & {
    submissions: Submission[]
}
export default function FacultyActivities({
    topic,
    points,
    numofattempts,
    availableto,
    courseId,
    codingActivity,
    submissions,
    activityId,
}: IProps) {
    const [isClicked, setIsClicked] = useState(false)

    const dueDate = moment(availableto, "ddd MMM DD YYYY HH:mm:ss ZZ")

    const handleActivityDelete: React.MouseEventHandler<SVGElement> = async (
        e
    ) => {
        e.preventDefault()
        try {
            const { data } = await api.delete(
                `api/ops/activity/delete/${activityId}`
            )
            window.location.reload()
        } catch (error: any) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                console.log(error.response.data)
            }
        }
    }
    return (
        <div className='max-w-xs rounded-lg border border-white bg-primary shadow-lg'>
            <div className='p-5'>
                <h5 className='mb-2 text-xl font-medium text-secondary'>
                    <Link
                        href={`/faculty/submissions/${codingActivity.codingactivityId}`}
                        className='font-bold underline'>
                        {topic}
                    </Link>
                </h5>
                <p className='mb-4 text-sm text-secondary'>
                    Number of points: {points}
                    <br />
                    Due Date: {dueDate.format("dddd, MMMM Do YYYY, h:mm:ss a")}
                </p>
                <div className=' '>
                    <ul className='flex items-center gap-7 text-secondary'>
                        <li>
                            <FiEdit
                                className=' h-6 w-6'
                                onClick={() =>
                                    router.push(
                                        `/faculty/courses/${courseId}/edit`
                                    )
                                }
                            />
                        </li>
                        {isClicked ? (
                            <li className='flex gap-7'>
                                <RiCloseCircleFill
                                    className=' h-6 w-6'
                                    onClick={() => setIsClicked(!isClicked)}
                                />
                                <ImCheckmark
                                    className=' h-6 w-6'
                                    onClick={(e) => handleActivityDelete(e)}
                                />
                            </li>
                        ) : (
                            <li>
                                <BsTrash
                                    className=' h-6 w-6'
                                    onClick={() => setIsClicked(!isClicked)}
                                />
                            </li>
                        )}

                        <li className=' flex font-bold'>
                            submitted: {submissions.length}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
