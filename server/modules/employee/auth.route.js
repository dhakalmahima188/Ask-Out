
const AuthCtrl = require("./auth.controller");
const AuthRouter = require("express").Router();

AuthRouter.route("/login").post(AuthCtrl.login);
AuthRouter.route("/register/:id").post(AuthCtrl.register);

module.exports = AuthRouter;