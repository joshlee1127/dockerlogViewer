var express = require("express")

const { names, title } = require("../config/config")
const { dockerComposeLog } = require("../controller/shCommand")
const util = require("util")
const exec = util.promisify(require("child_process").exec)

var router = express.Router()

/* GET home page. */
router.get("/", async function (req, res, next) {
    res.render("index", { title: title, logs: "", names: names })
})

router.get("/listalllog/:id", async (req, res, next) => {
    const id = req.params.id
    const execCommand = dockerComposeLog(id)
    try {
        console.log("exec command: ", execCommand)
        const { stdout, stderr } = await exec(execCommand)
        if (stdout) {
            res.render("index", {
                title: title,
                logs: stdout,
                names: names,
            })
        } else {
            res.render("index", {
                title: title,
                logs: "exec docker log error",
                names: names,
            })
        }
    } catch (err) {
        res.render("index", {
            title: title,
            logs: "no data",
            names: names,
        })
    }
})

module.exports = router
