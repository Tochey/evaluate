const util = require("util")
const exec = util.promisify(require("child_process").exec)
const fs = require("fs")
const Path = require("path")
const { v1: uuidv1 } = require("uuid")

const submitJaveCode = async (code, testCases, language) => {
    let folderName = uuidv1()
    let filename = "Solution.java"
    let unitTestFileName = "SolutionTest.java"
    let folder = "/tmp" + "/" + folderName
    let path = folder + "/"
    let result = null
    let testRunnerFileName = "TestRunner.java"
    let testRunnerCode =
        "import org.junit.runner.JUnitCore;\nimport org.junit.runner.Result;\n\npublic class TestRunner {\n    public static void main(String[] args) {\n        Result result = JUnitCore.runClasses(SolutionTest.class);\n        int runCount = result.getRunCount();\n        int failureCount = result.getFailureCount();\n\n        int passedCount = runCount - failureCount;\n        double percentagePassed = (double) passedCount / runCount * 100;\n        \n        System.out.println(percentagePassed);\n    }\n}"

    try {
        fs.mkdirSync(folder, 0777)
        fs.writeFileSync(path + filename, code)
        fs.writeFileSync(path + unitTestFileName, testCases)
        fs.writeFileSync(path + testRunnerFileName, testRunnerCode)
    } catch (e) {
        return "Something went wrong writing to file or creating"
    }

    var command =
        "cd " +
        folder +
        " && " +
        "javac Solution.java" +
        "&&" +
        "javac SolutionTest.java" +
        "&&" +
        "javac TestRunner.java" +
        "&&" +
        "java TestRunner"

    try {
        const { stdout } = await exec(command)
        result = stdout
    } catch (e) {
        console.log("err", e)
        const { stderr } = e
        result = stderr
    }

    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach((file, index) => {
            const curPath = Path.join(path, file)
            fs.unlinkSync(curPath)
        })
        fs.rmdirSync(path)
    }
    return { result }
}

module.exports = { submitJaveCode }
