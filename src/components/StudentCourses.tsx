import { Course, faculty, LearningObjective } from "@prisma/client"
import { MouseEventHandler } from "react"
type IProps = Omit<
    Course,
    "courseId" | "major" | "academicyear" | "createdAt" | "accessCode" | "instructorId"
> & { instructor: faculty } & { learningObjectives: LearningObjective } & {
    handleClick: MouseEventHandler<HTMLButtonElement>
}
export default function StudentCourses({
    coursename,
    academicterm,
    instructor,
    learningObjectives,
    handleClick,
}: IProps) {
    return (
        <div className='mt-5'>
            <div className='block max-w-sm rounded-lg bg-primary px-5 text-center shadow-lg'>
                <div className='border-b border-gray-300 py-3 px-6'>
                    <p className='text-lg font-bold text-white'>{coursename}</p>
                </div>
                <div className='p-6'>
                    <h5 className='mb-2 text-xl  font-bold text-white'>
                        Instructor:
                        <span className='uppercase text-secondary'>
                            {" "}
                            {instructor.firstName} {instructor.lastName}
                        </span>
                    </h5>
                    <p className='text-md font-bold text-white'>
                        Core Learning Objective:
                    </p>
                    <p className='mb-4 pt-3 text-secondary'>
                        {learningObjectives.description}
                    </p>
                    <button
                        type='button'
                        onClick ={handleClick}
                        className=' inline-block rounded border px-4 py-2 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-secondary hover:font-bold'>
                        View Activities
                    </button>
                </div>
                <div className='border-t border-gray-300 py-3 px-6 text-secondary'>
                    {academicterm}
                </div>
            </div>
        </div>
    )
}
