import { useRouter } from "next/router"
import api from "@lib/api"

export default function Index({ info }) {
    console.log(info)
    const { activities } = info
    const router = useRouter()
    const handleClick = (e) => {
        router.push(`${router.asPath}/createActivity`)
    }
    return (
        <div>
            {activities.map((e) => {
                return (
                    <button
                        key={e.activityId}
                        style={{
                            margin: "20px",
                            color: "red",
                            background: "black",
                        }}
                        onClick={() => handleClick(e)}>
                        {e.topic}
                    </button>
                )
            })}
            <button
                style={{
                    margin: "10px",
                    color: "green",
                    background: "black",
                }}
                onClick={(e) => handleClick(e)}>
                CREATE ACTIVITY
            </button>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const { courseId } = ctx.query
    const res = await api.get(`api/ops/course/read/${courseId}`)
    const info = res.data

    return {
        props: {
            info,
        },
    }
}
