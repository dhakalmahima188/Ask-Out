const usersmodel = require('./users.model')

async function getAll(req, res, next) {
    await usersmodel.find({}).sort({
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
    await usersmodel.findOne({
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

// async function getByTag(req, res, next) {
//   await usersmodel.findOne({
//           _id: req.params.tag
//       })
//       .exec(function (err, data) {
//           if (err) {
//               return next(err);
//           }
//           if (!data) {
//               return next({
//                   msg: "Not Found",
//                   status: 404
//               })
//           }
//           res.json(data)
//       })
// }

async function getbyname(req, res, next) {
    await usersmodel.findOne({
            username: req.body.username
        })
        .exec(async function (err, data) {
            if (err) {
                console.log(err)
                return next(err);
            }
            if (data) {
                res.json(data)
            } else {
                return next({
                    msg: "Not Found",
                    status: 404
                })
            }
        })
}


module.exports = {
    getAll,
    getById,
    getbyname
    //getByTag
}