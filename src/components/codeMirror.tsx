import { javaDefault } from "@lib/defaults"
import { langs } from "@uiw/codemirror-extensions-langs"
import { dracula } from "@uiw/codemirror-themes-all"
import CodeMirror from "@uiw/react-codemirror"
import axios from "axios"
import moment from "moment"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { GoPrimitiveDot } from "react-icons/go"
interface IProps {
    testCases: string
    language: string
    codingActivityId: string
    sid: string
    question: string
    numofattempts: number
}

type IButtonProps = {
    state: string
    func: () => void
}
export default function CodeUi({
    testCases,
    sid,
    language,
    codingActivityId,
    question,
    numofattempts,
}: IProps) {
    const [codeActivity, setCodeActivity] = useState(javaDefault)
    const [output, setOutput] = useState("")
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const RunButton = ({ state, func }: IButtonProps) => {
        return (
            <div className=''>
                <button
                    className={`inline-block rounded border px-4 py-2 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-secondary hover:font-bold ${
                        state === "disabled" ? "cursor-not-allowed" : ""
                    }`}
                    disabled={state == "disabled" ? true : false}
                    onClick={() => func()}>
                    RUN
                </button>
            </div>
        )
    }

    const SubmitButton = ({ state, func }: IButtonProps) => {
        return (
            <div className=''>
                <button
                    className={`inline-block rounded border px-4 py-2 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-secondary hover:font-bold ${
                        state === "disabled" ? "cursor-not-allowed" : ""
                    }`}
                    disabled={state == "disabled" ? true : false}
                    onClick={() => func()}>
                    SUBMIT
                </button>
            </div>
        )
    }

    const runCodeActivity = async () => {
        const data = {
            code: codeActivity,
            language: language,
            testCases: testCases,
        }
        try {
            setIsLoading(true)
            setOutput("")
            await axios
                .post(
                    (process.env.NEXT_PUBLIC_LAMBDA_CODE_EXEC_URL +
                        "/run-code") as string,
                    data
                )
                .then(async ({ data: { result } }) => {
                    setOutput(result)
                })
            setIsLoading(false)
        } catch (error) {
            alert(error)
        }
    }

    const submitCodeActivity = async () => {
        const data = {
            code: codeActivity,
            language: language,
            testCases: testCases,
        }

        if (data.code.match(RegExp("private\\s+[\\w\\s<>,]+\\([^\\)]*\\)"))) {
            setOutput(
                "Private methods are not allowed, please change it to public"
            )
            setIsLoading(false)
            return
        }

        try {
            setIsLoading(true)
            setOutput("")
            await axios
                .post(
                    (process.env.NEXT_PUBLIC_LAMBDA_CODE_EXEC_URL +
                        "/submit-code") as string,
                    data
                )
                .then(async ({ data: { result } }) => {
                    result = result.replace(/\n/g, "")
                    result = Number(result)

                    if (Number.isNaN(result)) {
                        result = 0
                    }

                    const post_data = {
                        codingActivityId: codingActivityId,
                        score: result.toString(),
                        sourceCode: codeActivity,
                        submittedAt: moment().format(
                            "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ"
                        ),
                    }

                    await axios.post(
                        `/api/ops/student/update/assignGrade/${sid}`,
                        post_data
                    )
                    setIsLoading(false)
                    const prompt = `Give me feedback on this code : ${codeActivity}, besed on this question : ${question}.`
                    router.push({
                        pathname: "/feedback",
                        query: { prompt: prompt },
                    })
                })
        } catch (error) {
            setOutput(
                "Something went wrong please contact tochey@outlook.com or try again"
            )
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const res = localStorage.getItem(codingActivityId)

        if (!res) {
            setCodeActivity(javaDefault)
            return
        }
        setCodeActivity(res)
    }, [])

    return (
        <div className='flex w-full gap-10'>
            <div className=' w-1/2'>
                <div className='p-5 text-center'>
                    <h1 className='text-lg text-white'>
                        Welcome this is a coding activity in{" "}
                        <span className='font-bold text-secondary'>
                            {language}
                        </span>
                    </h1>
                    <p className='text-lg text-white'>
                        You have{" "}
                        <span className='text-lg font-bold text-secondary'>
                            {numofattempts}
                        </span>{" "}
                        attempt/s remaining
                    </p>
                    <p className='text-lg text-white'>
                        Q:{" "}
                        <span className='text-lg font-bold text-secondary'>
                            {question}
                        </span>
                    </p>
                </div>
                <CodeMirror
                    value={codeActivity}
                    placeholder='enter your code here'
                    theme={dracula}
                    height='600px'
                    extensions={[langs.java()]}
                    onChange={(value) => {
                        setCodeActivity(value)
                        localStorage.setItem(codingActivityId, value)
                    }}
                    className='border border-black p-1 '
                />
            </div>
            <div className='mr-10 flex flex-col items-center justify-center gap-10'>
                {!isLoading ? (
                    <>
                        <RunButton state={"enabled"} func={runCodeActivity} />
                        {/* <GoPrimitiveDot className='text-xl text-secondary' /> */}
                        <SubmitButton
                            state={"enabled"}
                            func={submitCodeActivity}
                        />
                    </>
                ) : (
                    <>
                        <RunButton state={"disabled"} func={runCodeActivity} />
                        <div role='status'>
                            <svg
                                aria-hidden='true'
                                className='mr-2 h-8 w-8 animate-spin fill-secondary text-gray-200 dark:text-gray-600'
                                viewBox='0 0 100 101'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'>
                                <path
                                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                                    fill='currentColor'
                                />
                                <path
                                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                                    fill='currentFill'
                                />
                            </svg>
                            <span className='sr-only'>Loading...</span>
                        </div>
                        {/* <GoPrimitiveDot className='text-xl text-secondary' /> */}
                        <SubmitButton
                            state={"disabled"}
                            func={submitCodeActivity}
                        />
                    </>
                )}
            </div>
            <div className='flex w-1/2 flex-col p-5 text-xl font-bold'>
                <div className='h-1/2'>
                    <h1 className='text-center text-secondary'>Output</h1>
                    {output && (
                        <div className='pt-10 text-xl font-bold text-secondary'>
                            {output}
                        </div>
                    )}
                </div>
                <div className='h-1/2'>
                    {/* <h1 className='text-secondary'>Error</h1> */}
                </div>
            </div>
        </div>
    )
}
