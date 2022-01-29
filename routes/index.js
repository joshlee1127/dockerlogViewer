var express = require("express")

const { names } = require("../config/config")
const util = require("util")
const exec = util.promisify(require("child_process").exec)

var router = express.Router()

/* GET home page. */
router.get("/", async function (req, res, next) {
    res.render("index", { title: "Express", logs: "", names: names })
})

router.get("/listalllog/:id", async (req, res, next) => {
    const id = req.params.id
    // const execCommand = "docker ps -q | xargs -L 1 docker logs"
    const execCommand = "docker logs --tail 1000 " + id
    try {
        const { stdout, stderr } = await exec(execCommand)
        if (stdout) {
            res.render("index", {
                title: "Express",
                logs: stdout,
                names: names,
            })
        } else {
            res.render("index", {
                title: "Express",
                logs: "exec docker log error",
                names: names,
            })
        }
    } catch (err) {
        res.render("index", {
            title: "Express",
            logs: "no data",
            names: names,
        })
    }
})
function reverseString(str) {
    const arrayStrings = str.split("")
    const reverseArray = arrayStrings.reverse()
    const joinArray = reverseArray.join("")
    return joinArray
}
module.exports = router
