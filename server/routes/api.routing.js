const router = require("express").Router();
const workrouter = require("../modules/workspace/workspace.route")
const authenticate=require("../middlewares/authenticate")
const auth = require("../modules/employee/auth.route")
const users = require("../modules/employee/users.route")
router.use("/employee",authenticate, users)
router.use("/auth", auth)
router.use("/workspace", workrouter)

module.exports = router