var express = require("express")

let { names, title } = require("../config/config")
const {
    dockerComposeLog,
    dockerComposeRestart,
} = require("../controller/shCommand")
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

router.get("/restart", (req, res) => {
    res.render("restart/restart", { title: title, logs: "", names: names })
})
router.get("/restart/:id", async (req, res) => {
    const id = req.params.id
    const execCommand = dockerComposeRestart(id)
    try {
        console.log("exec command: ", execCommand)
        const { stdout, stderr } = await exec(execCommand)
        if (stdout) {
            res.render("restart/restart", {
                title: title,
                logs: stdout,
                names: names,
            })
        } else {
            console.log("stderr" + stderr)
            res.render("restart/restart", {
                title: title,
                logs: stderr,
                names: names,
            })
        }
    } catch (err) {
        res.render("restart/restart", {
            title: title,
            logs: "no data",
            names: names,
        })
    }
})
module.exports = router
