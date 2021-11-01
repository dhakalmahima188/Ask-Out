const router = require("express").Router();
const workrouter = require("../modules/workspace/workspace.route")
router.use("/workspace", workrouter)

module.exports = router