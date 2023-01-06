const util = require("util")
const exec = util.promisify(require("child_process").exec)
const fs = require("fs")
const Path = require("path")
const { v1: uuidv1 } = require("uuid")

const runjavaCode = async (code, language) => {
    let folderName = uuidv1()
    let filename = "Solution.java"
    let folder = "/tmp" + "/" + folderName
    let path = folder + "/"
    let result = null

    try {
        fs.mkdirSync(folder, 0777)
        fs.writeFileSync(path + filename, code)
    } catch (e) {
        console.log(e)
        return "Something went wrong writing to file or creating"
    }

    var command =
        "cd " + folder + " && " + " javac Solution.java" + "&& java Solution"
    try {
        const { stdout } = await exec(command)
        result = stdout
    } catch (e) {
        if (e.toString().includes("ERR_CHILD_PROCESS_STDIO_MAXBUFFER")) {
            result = "Stop writing infinite for loops please"
        } else {
            const { stderr } = e
            result = stderr
        }
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

module.exports = { runjavaCode }
