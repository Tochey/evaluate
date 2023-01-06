const { runjavaCode } = require("./run_code/java")
const { submitJaveCode } = require("./submit_code/java")
exports.handler = async (event, context) => {
    const { path } = event

    if (path === "/run-code") {
        const { language, code } = JSON.parse(event.body)

        switch (language.toLowerCase()) {
            case "java":
                const result = await runjavaCode(code)
                return {
                    headers: {
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                    },
                    body: JSON.stringify(result),
                }
                break
            default:
                break
        }
    }

    if (path === "/submit-code") {
        const { language, code, skeletonCode } = JSON.parse(event.body)

        switch (language.toLowerCase()) {
            case "java":
                const result = await submitJaveCode(code, skeletonCode)
                return {
                    headers: {
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                    },
                    body: JSON.stringify(result),
                }
                break

            default:
                break
        }
    }

    return {
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        body: JSON.stringify("test"),
    }
}
