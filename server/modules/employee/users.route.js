const usersRouter = require("express").Router();
const usersCtrl = require("./users.controller")

usersRouter.route("/").get(usersCtrl.getAll)
usersRouter.route("/:id").get(usersCtrl.getById)


module.exports = usersRouter