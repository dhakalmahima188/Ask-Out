const workmodel = require('./workspace.model')
const mappedData = require('../../helpers/mapWorkspace')
const nodemailer = require('nodemailer')
const env = require("../../configs/envConfig")

const sender = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: env.email,
        pass: env.password,
    },
})

function prepareMail(data) {
    let mailBody = {
        from: '"WLiT" <noreply@mernpractice.com>', // sender address
        to: "tanishach203@gmail.com," + data.email, // list of receivers
        subject: "Registration Link", // Subject line
        text: "Registration link", // plain text body
        html: `<p>Hi!! </p> 
    <p>Please click <a href="${data.link}">Here </a></p>`,
    }
    return mailBody
}

async function sendmail(req, res, next) {
    workmodel.findOne({
            name: req.body.name
        })
        .exec(function (err, workspace) {
            if (err) {
                return next(err)
            }
            if (!workspace) {
                return next({
                    msg: 'Workspace not registered yet',
                    status: 404
                })
            }
            var mailData = {
                name: req.body.name,
                email: req.body.email,
                link: `${req.headers.origin}/register?name=${req.body.name}`
            }
            var mailContent = prepareMail(mailData)
            console.log('contents>>>>', mailContent)
            sender.sendMail(mailContent, function (err, done) {
                if (err) {
                    return next(err)
                }
                res.json(done)
            })
        })
}

async function getAll(req, res, next) {
    await workmodel.find({}).sort({
            _id: -1,
        })
        .exec(function (err, data) {
            if (err) {
                return next(err);
            }
            res.json(data)
        })
}

async function getById(req, res, next) {
    await workmodel.findOne({
            _id: req.params.id
        })
        .exec(function (err, data) {
            if (err) {
                console.log(err)
                return next(err);
            }
            if (!data) {
                return next({
                    msg: "Not Found",
                    status: 404
                })
            }
            res.json(data)
        })
}

async function create(req, res, next) {
    const newData = new workmodel()
    const newMappedData = mappedData(newData, req.body)
    await newMappedData.save()
        .then(function (data) {
            res.json(data)
            console.log("success")
        })
        .catch(function (err) {
            next(err)
        })
}

async function update(req, res, next) {
    await workmodel.findById(req.params.id)
        .exec(async function (err, work) {
            if (err) {
                return next(err)
            }
            if (!work) {
                return next({
                    msg: "Workspce not found",
                    status: 404
                })
            }
            const updatedWork = mappedData(work, req.body)
            await updatedWork.save(function (err, updated) {
                if (err) {
                    return next(err)
                }
                res.json(updated)
            })
        })
}

module.exports = {
    getAll,
    create,
    update,
    getById,
    sendmail
}