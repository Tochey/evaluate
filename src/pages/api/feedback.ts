import { OpenAIStream, OpenAIStreamPayload } from "@lib/OpenAIStream"
import { NextApiRequest, NextApiResponse } from "next"
import { NextRequest } from "next/server"
import { Configuration, OpenAIApi } from "openai"

export const config = {
    runtime: "experimental-edge",
}
// export default async function feedback(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     const { code, question } = req.body
//     const prompt = `Based on this ${question}, give me feedback on the following code - ${code}`

//     const configuration = new Configuration({
//         apiKey: process.env.OPEN_API_KEY,
//     });
//     const openai = new OpenAIApi(configuration);
//     const {data} = await openai.createCompletion({
//         model: "text-davinci-003",
//         prompt: prompt,
//         max_tokens: 200,
//         temperature: 0.2,
//       });

//     return res.status(200).json(data);
// }

const handler = async (req: NextRequest): Promise<Response> => {
    const { prompt } = (await req.json()) as {
        prompt?: string
    }

    if (!prompt) {
        return new Response("No prompt in the request", { status: 400 })
    }

    const payload: OpenAIStreamPayload = {
        model: "text-davinci-003",
        prompt: `Give me feedback on this code : ${prompt}, ignore the main method`,
        temperature: 0.2,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 200,
        stream: true,
        n: 1,
    }

    const stream = await OpenAIStream(payload)
    return new Response(stream)
}

export default handler
