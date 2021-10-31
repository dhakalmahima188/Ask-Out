const workmodel = require('./workspace.model')
const mappedData = require('../../helpers/mapWorkspace')
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
    getById
}