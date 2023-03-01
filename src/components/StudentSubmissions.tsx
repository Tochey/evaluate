import api from "@lib/api"
import { requireFacultyAuthentication } from "@lib/requireAuthentication"
import { GetServerSidePropsContext } from "next"
import Link from "next/link"
import Image from "next/image"
import router from "next/router"
import { BsTrash, BsFillPersonFill } from "react-icons/bs"
import { FiEdit } from "react-icons/fi"
import { ImCheckmark } from "react-icons/im"
import { RiCloseCircleFill } from "react-icons/ri"
import { useState } from "react"
import { Student, Submission } from "@prisma/client"
import moment from "moment"

type IProps = Pick<
    Submission,
    "submittedAt" | "score" | "isLate" | "sourceCode"
> &
    Pick<Student, "fullName">

export default function StudentSubmission({
    score,
    sourceCode,
    submittedAt,
    isLate,
    fullName,
}: IProps) {

    const dueDate = moment(submittedAt, "ddd MMM DD YYYY HH:mm:ss ZZ")

    return (
        <div className='max-w-xs rounded-lg border border-secondary bg-primary shadow-lg'>
            <div className='p-6'>
                <h2 className='text-white'>{fullName}</h2>
                {isLate ? <p className='font-bold text-red-500'>LATE</p> : ""}
                <p className='mb-4 text-sm text-secondary'>
                    Score: {score}
                    <br />
                    Submitted at:{" "}
                    {dueDate.format("dddd, MMMM Do YYYY, h:mm:ss a")}
                </p>
                <textarea
                    value={sourceCode}
                    className={"w-full p-2 outline-none"}
                    readOnly={true}
                />
            </div>
        </div>
    )
}
