import StudentSubmission from "@components/StudentSubmissions"
import api from "@lib/api"
import { requireFacultyAuthentication } from "@lib/requireAuthentication"
import { Student, Submission } from "@prisma/client"
import { GetServerSidePropsContext } from "next"

interface IProps {
    studentSubmissions: Array<Submission & { student: Student }>
}

export default function StudentSubmissions({ studentSubmissions }: IProps) {
    return (
        <>
            {studentSubmissions.length == 0 ? (
                <p className='text-2xl font-bold text-secondary'>
                    No Students have submitted this activity
                </p>
            ) : (
                <>
                    <p className='my-5 text-3xl  font-bold italic text-secondary'>
                        Submissions{" "}
                    </p>
                    <div className='flex flex-col items-center gap-10 md:flex-row'>
                        {studentSubmissions.map(
                            (
                                {
                                    submittedAt,
                                    score,
                                    isLate,
                                    sourceCode,
                                    student: { fullName },
                                },
                                index
                            ) => {
                                return (
                                    <StudentSubmission
                                        key={index}
                                        submittedAt={submittedAt}
                                        score={score}
                                        isLate={isLate}
                                        sourceCode={sourceCode}
                                        fullName={fullName}
                                    />
                                )
                            }
                        )}
                    </div>
                </>
            )}
        </>
    )
}

export const getServerSideProps = requireFacultyAuthentication(
    async (ctx: GetServerSidePropsContext) => {
        const { codingActivityId } = ctx.query

        const { data } = await api.get(
            `/api/ops/activity/read/submissions/${codingActivityId}`
        )
        const { submissions } = data
        return {
            props: {
                studentSubmissions: submissions,
            },
        }
    }
)
