import { requireStudentAuthentication } from "@lib/requireAuthentication"
import { useRouter } from "next/router"
import { useState } from "react"

export default function FeedBack() {
    const [feedBack, setFeedBack] = useState("")
    const [isDisabled, setIsDisabled] = useState(false)
    const {
        push,
        query: { prompt },
    } = useRouter()

    const generateFeedBack: React.MouseEventHandler<HTMLButtonElement> = async (
        e
    ) => {
        setFeedBack("")
        setIsDisabled(true)
        const response = await fetch("/api/feedback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: prompt,
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
    }
    return (
        <>
            <div>
                <p className='font-bold text-secondary'>WARNING: IN BETA</p>
            </div>
            <div className='flex gap-6'>
                <button
                    className={`my-3 inline-block rounded border px-4 py-2 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-secondary hover:font-bold ${
                        isDisabled ? "cursor-not-allowed" : ""
                    }`}
                    type='button'
                    disabled={isDisabled ? true : false}
                    onClick={(e) => generateFeedBack(e)}>
                    Generate Feedback
                </button>
                <button
                    className='my-3 inline-block rounded border px-4 py-2 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-secondary hover:font-bold'
                    type='button'
                    onClick={(e) => push("/student/dashboard")}>
                    Back to Dashboard
                </button>
            </div>
            <div>
                {feedBack && (
                    <p className=' font-mono text-lg font-bold text-secondary'>
                        {feedBack}
                    </p>
                )}
            </div>
        </>
    )
}

export const getServerSideProps = requireStudentAuthentication(async (ctx) => {
    const query = ctx.query

    if (!query.prompt) {
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
