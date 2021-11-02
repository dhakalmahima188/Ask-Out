const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    title: String,
    description: {
        type: String,
        required: true
    },
    replies: [{
        employee_id: {
            type: String,
        },
        answer: {
            type: String,
        },
        likes: {
            type: Array,
            default: []
        },
        dislikes: {
            type: Array,
            default: String
        }
    }],
    employee_id: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        enum: [
            'IT', 'FINANCE', 'HR'
        ]
    },
    ques_state: {
        type: String,
        default: "Active",
        enum: ['Active', 'Close']
    }
}, {
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeout: 1000
    }
});
QuestionSchema.set('timestamps', true);
module.exports = mongoose.model("Question", QuestionSchema)