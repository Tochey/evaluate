import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { getUser } from "./AuthContext"

export function requireStudentAuthentication(gssp: GetServerSideProps) {
    return async (context: GetServerSidePropsContext) => {
        const res = await getUser(context)

        if (res.status === "SIGNED_OUT") {
            return {
                redirect: {
                    destination: "/login",
                    statusCode: 302,
                },
            }
        }

        if (res.status === "SIGNED_IN" && res.user!.role !== "STUDENT") {
            return {
                redirect: {
                    destination: "/faculty/login",
                    statusCode: 302,
                },
            }
        }

        return await gssp(context)
    }
}

export function requireFacultyAuthentication(gssp: GetServerSideProps) {
    return async (context: GetServerSidePropsContext) => {
        const res = await getUser(context)

        if (res.status === "SIGNED_OUT") {
            return {
                redirect: {
                    destination: "/login",
                    statusCode: 302,
                },
            }
        }

        if (res.status === "SIGNED_IN" && res.user!.role !== "FACULTY") {
            return {
                redirect: {
                    destination: "/login",
                    statusCode: 302,
                },
            }
        }

        return await gssp(context)
    }
}
