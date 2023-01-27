import { requireStudentAuthentication } from "@lib/requireAuthentication"
import { useRouter } from "next/router"
import { useState } from "react"

export default function FeedBack() {
    const [feedBack, setFeedBack] = useState("")
    const {
        push,
        query: { code },
    } = useRouter()

    const generateFeedBack: React.MouseEventHandler<HTMLButtonElement> = async (
        e
    ) => {
        setFeedBack("")
        // setLoading(true);
        const response = await fetch("/api/feedback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: code,
            }),
        })

        console.log("Edge function returned.")

        if (!response.ok) {
            return push("/student/dashboard")
        }

        // This data is a ReadableStream
        const data = response.body
        if (!data) {
            return
        }

        const reader = data.getReader()
        const decoder = new TextDecoder()
        let done = false
        while (!done) {
            const { value, done: doneReading } = await reader.read()
            done = doneReading
            const chunkValue = decoder.decode(value)
            setFeedBack((prev) => prev + chunkValue)
        }

        setTimeout(() => {
            push("/student/dashboard")
        }, 5000)
    }
    return (
        <div className='flex gap-6'>
            <button
                className='my-3 inline-block rounded border px-4 py-2 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-secondary hover:font-bold'
                type='button'
                onClick={(e) => generateFeedBack(e)}>
                Generate Feedback
            </button>
            <button
                className='my-3 inline-block rounded border px-4 py-2 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-secondary hover:font-bold'
                type='button'
                onClick={(e) => push("/student/dashboard")}>
                Back to Dashboard
            </button>
            {feedBack && (
                <p className=' font-mono text-lg font-bold text-secondary'>
                    {feedBack}
                </p>
            )}
        </div>
    )
}

export const getServerSideProps = requireStudentAuthentication(async (ctx) => {
    const query = ctx.query

    if (!query.code) {
        return {
            redirect: {
                destination: "/student/dashboard",
                permanent: false,
            },
        }
    }

    return {
        props: {},
    }
})
