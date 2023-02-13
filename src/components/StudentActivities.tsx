import { useRouter } from "next/router"
import { Activity } from "@prisma/client"
import moment from "moment"

type IProps = Omit<Activity, "courseId" | "availablefrom"> & {
    isAvailable: boolean
}
type CourseMouseEventHandler = (
    event: React.MouseEvent<HTMLButtonElement>,
    activityId: string
) => void
export default function StudentActivities({
    topic,
    points,
    numofattempts,
    isAvailable,
    availableto,
    activityId,
}: IProps) {
    const router = useRouter()

    const handleClick: CourseMouseEventHandler = (e, activityId) => {
        e.preventDefault()
        router.push(`${router.asPath}/activity/${activityId}`)
    }
    const dueDate = moment(availableto, "ddd MMM DD YYYY HH:mm:ss ZZ")
    return (
        <div className='max-w-sm overflow-hidden rounded border-x border-secondary bg-primary text-secondary shadow-lg'>
            <div className='px-6 py-4'>
                <div className='mb-2 text-xl font-bold text-white'>{topic}</div>
                <p className='text-base text-secondary'>
                    Points:{" "}
                    <span className='font-bold text-white'>{points}</span> |
                    Attempts:{" "}
                    <span className='font-bold text-white'>
                        {numofattempts}
                    </span>{" "}
                    | Due :{" "}
                    <span className='font-bold text-white'>
                        {dueDate.format("dddd, MMMM Do YYYY, h:mm:ss a")}
                    </span>
                </p>
            </div>
            <div className='px-6 py-4'>
                <button
                    className={`inline-block rounded border px-4 py-2 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out  ${
                        isAvailable
                            ? "hover:bg-secondary hover:font-bold"
                            : " cursor-not-allowed"
                    }`}
                    onClick={(e) => handleClick(e, activityId)}
                    disabled={isAvailable ? false : true}>
                    {isAvailable ? "Start" : "Graded"}
                </button>
            </div>
        </div>
    )
}
