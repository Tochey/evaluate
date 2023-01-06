// wraps all prisma operations in try and catch
import { NextApiResponse } from "next"
export default async function prismaErrorWrapper(res : NextApiResponse, prismaOperation: () => any) {
    try {
        const result = await prismaOperation()

        if (!result)
            return res.status(404).json("No response returned for query")
        return res.status(200).json(result)
    } catch (err : any) {
        console.log(err)
        return res.status(400).json({
            message: err.message,
        })
    }
}
