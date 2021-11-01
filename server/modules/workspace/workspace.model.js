const mongoose = require("mongoose");
const schema = mongoose.Schema;
const WorkspaceSchema = new schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
}, {
  writeConcern: {
    w: 'majority',
    j: true,
    wtimeout: 1000
  }
});
WorkspaceSchema.set('timestamps', true);
module.exports = mongoose.model("Workspace", WorkspaceSchema)