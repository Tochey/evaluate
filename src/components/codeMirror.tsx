import { javaDefault } from "@lib/defaults"
import { langs } from "@uiw/codemirror-extensions-langs"
import { dracula } from "@uiw/codemirror-themes-all"
import CodeMirror from "@uiw/react-codemirror"
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
interface IProps {
    skeletonCode: string
    language: string
    codingActivityId: string
    sid: string
    question: string
}

type IButtonProps = {
    state: string
    func: () => void
}
export default function CodeUi({
    skeletonCode,
    sid,
    language,
    codingActivityId,
    question,
}: IProps) {
    const [codeActivity, setCodeActivity] = useState(javaDefault)
    const [output, setOutput] = useState("")
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const RunButton = ({ state, func }: IButtonProps) => {
        return (
            <button
                className={`inline-block rounded border px-4 py-2 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-secondary hover:font-bold ${
                    state === "disabled" ? "cursor-not-allowed" : ""
                }`}
                disabled={state == "disabled" ? true : false}
                onClick={() => func()}>
                RUN
            </button>
        )
    }

    const SubmitButton = ({ state, func }: IButtonProps) => {
        return (
            <button
                className={`ml-3 inline-block rounded border px-4 py-2 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-secondary hover:font-bold ${
                    state === "disabled" ? "cursor-not-allowed" : ""
                }`}
                disabled={state == "disabled" ? true : false}
                onClick={() => func()}>
                SUBMIT
            </button>
        )
    }

    const runCodeActivity = async () => {
        const data = {
            code: codeActivity,
            language: language,
            skeletonCode: skeletonCode,
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
            skeletonCode: skeletonCode,
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
                    }

                    await axios.post(
                        `/api/ops/student/update/assignGrade/${sid}`,
                        post_data
                    )
                    setIsLoading(false)
                    const prompt = `Give me feedback on this code : ${codeActivity}, besed on this question : ${question}.`
                    router.push({
                        pathname: "/feedback",
                        query: { prompt : prompt},
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
        <div className='h-[] pt-[30px]'>
            <div className='absolute top-40 bottom-40 left-20 right-20 my-20 w-[70%] text-left'>
                <CodeMirror
                    value={codeActivity}
                    placeholder='enter your code here'
                    theme={dracula}
                    height='545px'
                    extensions={[langs.java()]}
                    onChange={(value) => {
                        setCodeActivity(value)
                        localStorage.setItem(codingActivityId, value)
                    }}
                    className='border border-black p-1 '
                />
                {output && (
                    <div className='text-xl font-bold text-secondary'>
                        {output}
                    </div>
                )}
                {!isLoading ? (
                    <div className='mt-3'>
                        <RunButton state={"enabled"} func={runCodeActivity} />
                        <SubmitButton
                            state={"enabled"}
                            func={submitCodeActivity}
                        />
                    </div>
                ) : (
                    <>
                        <div className='text-xl font-bold text-secondary'>
                            please wait...
                        </div>
                        <div className='mt-3'>
                            <RunButton
                                state={"disabled"}
                                func={runCodeActivity}
                            />
                            <SubmitButton
                                state={"disabled"}
                                func={submitCodeActivity}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
