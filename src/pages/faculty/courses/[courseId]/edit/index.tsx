import api from "@lib/api"
import { useAuth } from "@lib/AuthContext"
import { requireFacultyAuthentication } from "@lib/requireAuthentication"
import { Course, faculty, LearningObjective } from "@prisma/client"
import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"
import { useState } from "react"
interface IProps {
    course: Course & { instructor: faculty } & {learningObjectives: LearningObjective}
}
export default function EditCourse({course} : IProps) {
        const { auth } = useAuth()
        const router = useRouter()
        const {coursename, academicyear, academicterm, accessCode, learningObjectives, courseId} = course
        
        const [data, setData] = useState({
            coursename: coursename,
            academicyear: academicyear,
            academicterm: academicterm,
            accessCode : accessCode,
            learningObjectives: learningObjectives.description,
            facultyId: (auth.user as faculty).facultyId,
        })
        const handleEditCourseChange: (
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => void = ({ currentTarget: input }) => {
            setData({ ...data, [input.name]: input.value })
        }
    
        const handleEditCourse: React.MouseEventHandler<
            HTMLButtonElement
        > = async () => {
            if (
                data.coursename === "" ||
                data.academicyear === "" ||
                data.academicterm === "" ||
                data.learningObjectives === "" || 
                data.accessCode === ""
            ) {
                alert("Please fill in ALL fields")
                return
            }
    
            try {
                // const res = await api.post(`/api/ops/course/update/${courseId}`, data)
                // console.log(res.data)
                router.push("/faculty/dashboard")
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
                            htmlFor='coursenamme'>
                            Course Name
                        </label>
                        <input
                            className='mb-3 block w-full appearance-none rounded border bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:bg-white focus:outline-none'
                            id='coursename'
                            type='text'
                            name='coursename'
                            placeholder='Intro to xxx'
                            value={data.coursename}
                            onChange={handleEditCourseChange}
                        />
                        <p className='text-xs font-bold italic text-secondary'>
                            Please fill ALL fields.
                        </p>
                    </div>
                    <div className='w-full px-3 md:w-1/2'>
                        <label
                            className='mb-2 block text-xs font-bold uppercase tracking-wide text-secondary'
                            htmlFor='academicyear'>
                            Academic Year
                        </label>
                        <input
                            className='block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none'
                            id='academicyear'
                            name='academicyear'
                            type='text'
                            placeholder='Spring 23'
                            value={data.academicyear}
                            onChange={handleEditCourseChange}
                        />
                    </div>
                </div>
                <div className='-mx-3 mb-6 flex flex-wrap'>
                    <div className='w-full px-3'>
                        <label
                            className='mb-2 block text-xs font-bold uppercase tracking-wide text-secondary'
                            htmlFor='academicterm'>
                            Academic Term
                        </label>
                        <input
                            className='mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none'
                            id='academicterm'
                            name='academicterm'
                            type='text'
                            placeholder='Fall 22/Spring 23'
                            value={data.academicterm}
                            onChange={handleEditCourseChange}
                        />
                    </div>
                </div>
                <div className='-mx-3 mb-6 flex flex-wrap'>
                    <div className='w-full px-3'>
                        <label
                            className='mb-2 block text-xs font-bold uppercase tracking-wide text-secondary'
                            htmlFor='accessCode'>
                            Access Code
                        </label>
                        <input
                            className='mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none'
                            id='accessCode'
                            name='accessCode'
                            type='text'
                            placeholder=''
                            value={data.accessCode}
                            onChange={handleEditCourseChange}
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
                            placeholder='Understand the basics of Object Oriented Programming in JAVA'
                            value={data.learningObjectives}
                            onChange={(e) => handleEditCourseChange(e)}
                        />
                    </div>
                </div>
                <div className='-mx-3 mb-6 flex flex-wrap '>
                    <div className='w-full px-3'>
                        <button
                            className='my-3 inline-block rounded border px-4 py-2 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-secondary hover:font-bold'
                            onClick={handleEditCourse}
                            type='button'>
                            Edit Course
                        </button>
                    </div>
                </div>
            </form>
        )
    }


    export const getServerSideProps = requireFacultyAuthentication(
        async (ctx: GetServerSidePropsContext) => {
            const { courseId } = ctx.query
            const {data} = await api.get(`/api/ops/course/read/${courseId}`)
            
            return {
                props: {
                  course: data
                },
            }
        }
    )