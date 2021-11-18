const quesmodel = require('./question.model')
const mappedData = require('../../helpers/mapQues')

async function createQues(req, res, next) {
  const newQues = new quesmodel()
  const newMappedQues = mappedData(newQues, req.body)
  newMappedQues.employee_id = req.loggedInUser.id
  await newMappedQues.save()
    .then(function (data) {
      res.json(data);
      console.log("Successfully Ques created");
    })
    .catch(function (err) {
      next(err);
    });
}

async function getQues(req, res, next) {
  await quesmodel.find({})
    .exec(function (err, post) {
      if (err) {
        return next(err);
      }
      if (post) {
        res.json(post);
      } else {
        next({
          msg: "Questions not found",
          status: 404,
        });
      }
    });
}
async function getQuesbyTag(req, res, next) {
  await quesmodel.find({
      workspace_id: req.params.id,
      tag: req.body.tag
    })
    .exec(function (err, post) {
      if (err) {
        return next(err);
      }
      if (post) {
        res.json(post);
      } else {
        next({
          msg: "Questions not found",
          status: 404,
        });
      }
    });
}

async function getQuesbyId(req, res, next) {
  await quesmodel.find({
      _id: req.params.id,
    })
    .exec(function (err, post) {
      if (err) {
        return next(err);
      }
      if (post) {
        res.json(post);
      } else {
        next({
          msg: "Question not found",
          status: 404,
        });
      }
    });
}

async function getQuesbyWorkId(req, res, next) {
  await quesmodel.find({
      workspace_id: req.params.id,
    }).sort({
      _id: -1,
    })
    .exec(function (err, post) {
      if (err) {
        return next(err);
      }
      if (post) {
        res.json(post);
      } else {
        next({
          msg: "Questions not found",
          status: 404,
        });
      }
    });
}

async function updateQues(req, res, next) {
  await quesmodel.findById(req.params.id)
    .exec(async function (err, ques) {
      if (err) {
        return next(err);
      }
      if (!ques) {
        return next({
          msg: "Question not found",
          status: 404,
        });
      }
      const Ques = await quesmodel.findById(req.params.id);
      if (req.loggedInUser.id === Ques.employee_id) {
        const updatedQues = mappedData(ques, req.body);
        await updatedQues.save(function (err, updated) {
          if (err) {
            return next(err);
          }
          res.json(updated);
        });
      } else {
        return next({
          msg: "You can only update your questions",
          status: 404,
        });
      }
    });
}

async function deleteQues(req, res, next) {
  await quesmodel.findById(req.params.id)
    .exec(async function (err, ques) {
      if (err) {
        return next(err);
      }
      if (!ques) {
        return next({
          msg: "Question not found",
          status: 404,
        });
      }
      const Ques = await quesmodel.findById(req.params.id);
      if (req.loggedInUser.id === Ques.employee_id) {
        ques.remove(function (err, removed) {
          if (err) {
            return next(err);
          }
          res.json(removed);
        });
      } else {
        return next({
          msg: "You can only delete your questions",
          status: 404,
        });
      }
    });
}

//answers
async function postAnswer(req, res, next) {
  await quesmodel.findById(req.params.id).exec(async function (err, question) {
    if (err) {
      return next(err)
    }
    if (question) {
      const quest = await quesmodel.findById(req.params.id)
      await quest.updateOne({
        $push: {
          "replies": {
            "employee_id": req.loggedInUser.id,
            "answer": req.body.answer,
            "employee_name": req.body.employee_name
          }
        }
      })
      await quest.save(function (err, updated) {
        if (err) {
          return next(err);
        }
        res.json(updated);
      });
    } else {
      next({
        msg: "Question not found",
        status: 404,
      });
    }
  })
}

async function likeanswer(req, res, next) {
  await quesmodel.findById(req.params.id).exec(async function (err, question) {
    if (err) {
      return next(err)
    }
    if (question) {
      const check = await quesmodel.findOne({
        "$and": [{
            _id: req.params.id
          },
          {
            "replies._id": req.body.id
          }, {
            "replies.likes": {
              $elemMatch: {
                user: req.loggedInUser.id
              }
            }
          }
        ]
      })
      if (!check) {
        await quesmodel.updateOne({
          _id: req.params.id,
          "replies._id": req.body.id
        }, {
          $push: {
            "replies.$.likes": {
              user: req.loggedInUser.id
            }
          }
        })
        res.status(200).json(question);
      } else {
        await quesmodel.updateOne({
          _id: req.params.id,
          "replies._id": req.body.id
        }, {
          $pull: {
            "replies.$.likes": {
              user: req.loggedInUser.id
            }
          }
        })
        res.status(200).json(question);
      }
    } else {
      next({
        msg: "Question not found",
        status: 404,
      });
    }
  })
}

module.exports = {
  createQues,
  getQues,
  getQuesbyId,
  updateQues,
  deleteQues,
  postAnswer,
  likeanswer,
  getQuesbyWorkId,
  getQuesbyTag,
}