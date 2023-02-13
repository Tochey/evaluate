import api from "@lib/api"
import { useAuth } from "@lib/AuthContext"
import { faculty } from "@prisma/client"
import { useRouter } from "next/router"
import { useState } from "react"
import Datetime from "react-datetime"
import "react-datetime/css/react-datetime.css"
import moment, { Moment } from "moment"
import { requireFacultyAuthentication } from "@lib/requireAuthentication"
import { GetServerSidePropsContext } from "next"
interface IProps {
    courseId: string
}

export default function CreateActivity({ courseId }: IProps) {
    var yesterday = moment().subtract(1, "day")
    var valid = function (current: { isAfter: (arg0: moment.Moment) => any }) {
        return current.isAfter(yesterday)
    }
    const { auth } = useAuth()
    const router = useRouter()
    const [data, setData] = useState({
        topic: "",
        question: "",
        testCases: "",
        learningObjectives: "",
        facultyId: (auth.user as faculty).facultyId,
        availableto: "",
        language: "JAVA",
        courseId: courseId,
    })
    const handleCreateActivityChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const handleCreateActivity: React.MouseEventHandler<
        HTMLButtonElement
    > = async () => {
        if (
            data.topic === "" ||
            data.question === "" ||
            data.testCases === "" ||
            data.learningObjectives === "" ||
            data.availableto === ""
        ) {
            alert("Please fill in ALL fields")
            return
        }

        try {
            try {
                const res = await api.post("/api/ops/activity/create", data)
                console.log(res.data)
                router.push("/faculty/dashboard")
            } catch (error) {
                console.log(error)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <form className='w-full max-w-lg align-middle'>
            <div className='-mx-3 mb-6 flex flex-wrap'>
                <div className='mb-6 w-full px-3 md:mb-0 md:w-1/2'>
                    <label
                        className='mb-2 block text-xs font-bold uppercase tracking-wide text-secondary'
                        htmlFor='topic'>
                        Topic
                    </label>
                    <input
                        className='mb-3 block w-full appearance-none rounded border bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:bg-white focus:outline-none'
                        id='coursename'
                        type='text'
                        name='topic'
                        placeholder='Two Sum'
                        onChange={handleCreateActivityChange}
                    />
                    <p className='text-xs font-bold italic text-secondary'>
                        Please fill ALL fields.
                    </p>
                </div>
            </div>
            <div className='-mx-3 mb-6 flex flex-wrap'>
                <div className='w-full px-3'>
                    <label
                        className='mb-2 block text-xs font-bold uppercase tracking-wide text-secondary'
                        htmlFor='topic'>
                        Due Date & Time
                    </label>
                    <Datetime
                        className=''
                        isValidDate={valid}
                        onChange={(e) =>
                            setData({
                                ...data,
                                availableto: e.toLocaleString(),
                            })
                        }
                    />
                </div>
            </div>
            <div className='-mx-3 mb-6 flex flex-wrap'>
                <div className='w-full px-3'>
                    <label
                        className='mb-2 block text-xs font-bold uppercase tracking-wide text-secondary'
                        htmlFor='question'>
                        Question
                    </label>
                    <input
                        className='mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none'
                        id='activityquestion'
                        name='question'
                        type='text'
                        placeholder='Write a function that takes in one parameter and retruns its square'
                        onChange={handleCreateActivityChange}
                    />
                </div>
            </div>
            <div className='-mx-3 mb-6 flex flex-wrap'>
                <div className='w-full px-3'>
                    <label
                        className='mb-2 block text-xs font-bold uppercase tracking-wide text-secondary'
                        htmlFor='learningObjectives'>
                        Learning Objectives
                    </label>
                    <textarea
                        className='mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none'
                        name='learningObjectives'
                        id='learningObjectives'
                        placeholder='Develop a great understanding of parameters and methods'
                        onChange={(e) => handleCreateActivityChange(e)}
                    />
                </div>
            </div>
            <div className='-mx-3 mb-6 flex flex-wrap'>
                <div className='w-full px-3'>
                    <label
                        className='mb-2 block text-xs font-bold uppercase tracking-wide text-secondary'
                        htmlFor='testCases'>
                        Test Cases
                    </label>
                    <textarea
                        className='mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none'
                        name='testCases'
                        id='testCases'
                        placeholder={
                            "import org.junit.Test;\nimport static org.junit.Assert.*;\npublic class SolutionTest {\n    Solution solution = new Solution();\n    @Test\n  public void test1() {\n    int[] array = {1, 2, 3, 4, 5};\n    int target = 4;\n    int expectedResult = 3;\n\n    int result = solution.findNumber(array, target);\n    assertEquals(expectedResult, result);\n  }}"
                        }
                        onChange={(e) => handleCreateActivityChange(e)}
                    />
                </div>
            </div>
            <div className='-mx-3 mb-6 flex flex-wrap '>
                <div className='w-full px-3'>
                    <button
                        className='my-3 inline-block rounded border px-4 py-2 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-secondary hover:font-bold'
                        onClick={handleCreateActivity}
                        type='button'>
                        Create Activity
                    </button>
                </div>
            </div>
        </form>
    )
}

export const getServerSideProps = requireFacultyAuthentication(
    async (ctx: GetServerSidePropsContext) => {
        const { courseId } = ctx.query
        return {
            props: {
                courseId: courseId,
            },
        }
    }
)
