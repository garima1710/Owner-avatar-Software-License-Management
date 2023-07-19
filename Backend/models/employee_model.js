const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    // eid: 
    // { type: String },
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    }, 
    password: {
      type: String,
      required: [true, "password is required"],
    },
    location: {
      type: String,
      required: [true, "location is required"],
    }, 
    department: {
      type: String, 
      required: [true, "department is required"],
    }
}) 

const employee_model = mongoose.model("Employee", employeeSchema);

module.exports = employee_model;