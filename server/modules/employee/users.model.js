const mongoose = require("mongoose");
const schema = mongoose.Schema;
const EmployeeSchema  = new schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
        type: String,
        required: true,
        //unique: true,
      },
      username: {
        type: String,
        //required: true,
        unique: true,
      },
      workspace_id: {   //post create walA HERA
        type: String,
        //required: true,
      
      },
      tag: {   //post create walA HERA
        type: String,
        enum:[
         'IT','FINANCE','HR'
        ]
        //required: true,
      
      },
      
      
      
  },
  {
    writeConcern: {
      w: "majority",
      j: true,
      wtimeout: 1000,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Employee", EmployeeSchema);
