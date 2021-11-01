const WorkRouter = require("express").Router();
const WorkCtrl = require("./workspace.controller")

WorkRouter.route("/").get(WorkCtrl.getAll).post(WorkCtrl.create)
WorkRouter.route("/:id").put(WorkCtrl.update).get(WorkCtrl.getById)


module.exports = WorkRouter