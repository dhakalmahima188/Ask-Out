const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    "description": {
        type: String,
        required: true
    },
    "replies": [{
        "employee_id": {
            type: String,
        },
        "answer": {
            type: String,
        },
        "likes": [{
            user: {
                type: String,
            }
        }],
        "dislikes": [{
            user: {
                type: String,
            }
        }]
    }],
    "employee_id": {
        type: String,
        required: true
    },
    "tag": {
        type: String,
        enum: [
            'IT', 'FINANCE', 'HR'
        ],
        required: true
    },
    "ques_state": {
        type: String,
        default: "Active",
        enum: ['Active', 'Close']
    },
    "workspace_id": {
        type: String,
        required: true
    }
}, {
    "writeConcern": {
        w: 'majority',
        j: true,
        wtimeout: 1000
    }
});
QuestionSchema.set('timestamps', true);
module.exports = mongoose.model("Question", QuestionSchema)