import { BsTrash } from "react-icons/bs"
import Image from "next/image"
import { Course } from "@prisma/client"
import { useState } from "react"
import { ImCheckmark } from "react-icons/im"
import { RiCloseCircleFill } from "react-icons/ri"
import { BsFillPersonFill } from "react-icons/bs"
import { FiEdit } from "react-icons/fi"
import api from "@lib/api"
import Link from "next/link"
type IProps = Pick<
    Course,
    "coursename" | "accessCode" | "academicyear" | "courseId"
> & {
    numOfStudents: number
}
export default function FacultyCourses({
    courseId,
    coursename,
    accessCode,
    academicyear,
    numOfStudents,
}: IProps) {
    const [isClicked, setIsClicked] = useState(false)

    const handleCourseDelete: React.MouseEventHandler<SVGElement> = async (
        e
    ) => {
        e.preventDefault()
        try {
            const { data } = await api.delete(
                `api/ops/course/delete/${courseId}`
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
        <div className='max-w-xs rounded-lg bg-primary shadow-lg'>
            <Link href={`/faculty/courses/${courseId}`}>
                <Image
                    className='rounded-t-lg'
                    src={`https://picsum.photos/seed/${coursename}/320/200/?blur=2`}
                    width={320}
                    height={200}
                    alt=''
                />
            </Link>
            <div className='p-6'>
                <h5 className='mb-2 text-xl font-medium text-secondary'>
                    <Link href={`/faculty/courses/${courseId}`}>
                        {coursename}
                    </Link>
                </h5>
                <p className='mb-4 text-sm text-secondary'>
                    {academicyear}
                    <br />
                    Access Code: {accessCode}
                </p>

                <div className=' '>
                    <ul className='flex items-center gap-10 text-secondary'>
                        <li>
                            <FiEdit className=' h-6 w-6' />
                        </li>
                        {isClicked ? (
                            <li className='flex gap-10'>
                                <RiCloseCircleFill
                                    className=' h-6 w-6'
                                    onClick={() => setIsClicked(!isClicked)}
                                />
                                <ImCheckmark
                                    className=' h-6 w-6'
                                    onClick={(e) => handleCourseDelete(e)}
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
                            <BsFillPersonFill className='h-6 w-6' />
                            <span className='text-lg'>{numOfStudents}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
