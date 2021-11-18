const QuesRouter = require('express').Router();
const QuesCtrl = require('./question.controller')

QuesRouter.route("/").get(QuesCtrl.getQues).post(QuesCtrl.createQues)
QuesRouter.route("/:id").get(QuesCtrl.getQuesbyId).put(QuesCtrl.updateQues).delete(QuesCtrl.deleteQues)
QuesRouter.route("/tag/:id").post(QuesCtrl.getQuesbyTag)
QuesRouter.route("/answer/:id").put(QuesCtrl.postAnswer)
QuesRouter.route("/answer/like/:id").put(QuesCtrl.likeanswer)
QuesRouter.route("/work/:id").get(QuesCtrl.getQuesbyWorkId)
module.exports = QuesRouter