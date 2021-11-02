const mongoose = require("mongoose");
const schema = mongoose.Schema;
const EmployeeSchema = new schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  workspace_id: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    enum: [
      'IT', 'FINANCE', 'HR'
    ]
  },
}, {
  writeConcern: {
    w: "majority",
    j: true,
    wtimeout: 1000,
  },
});
EmployeeSchema.set('timestamps', true);
module.exports = mongoose.model("Employee", EmployeeSchema);