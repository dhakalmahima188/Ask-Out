const usersRouter = require("express").Router();
const usersCtrl = require("./users.controller")

usersRouter.route("/").get(usersCtrl.getAll)
usersRouter.route("/:id").get(usersCtrl.getById)
usersRouter.route("/name").post(usersCtrl.getbyname)


module.exports = usersRouter