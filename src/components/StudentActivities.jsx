import { useRouter } from "next/router"

export default function StudentActivities({
    topic,
    point,
    numberOfAttempts,
    isAvailable,
    availableto,
    activityId,
}) {
    const router = useRouter()
    const handleClick = (e) => {
        router.push(`${router.asPath}/activity/${e}`)
    }
    return (
        <div className='max-w-sm overflow-hidden rounded border-x border-secondary bg-primary text-secondary shadow-lg'>
            <div className='px-6 py-4'>
                <div className='mb-2 text-xl font-bold text-white'>{topic}</div>
                <p className='text-base text-secondary'>
                    Points:{" "}
                    <span className='font-bold text-white'>{point}</span> |
                    Attempts:{" "}
                    <span className='font-bold text-white'>
                        {numberOfAttempts}
                    </span>{" "}
                    | Due :{" "}
                    <span className='font-bold text-white'>
                        {new Date(availableto).toLocaleString()}
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
                    onClick={() => handleClick(activityId)}
                    disabled={isAvailable ? false : true}>
                    {isAvailable ? "Start" : "Graded"}
                </button>
            </div>
        </div>
    )
}
