const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema(
  {
    software: {
      type: String,
      required: [true, "software is required"],
    },
    purpose: {
      type: String,
      required: [true, "purpose is required"],
    },
    hostname: {
      type: String,
      required: [true, "hostname is required"]
    },
    approval: {
      type: String,
      required: [true, "Approval document is required"],
    },
    req_remarks: {
      type: String
    },
    req_date: {
      type: Date,
      // default: () => new Date.now(),
      default: Date.now(),
      required: true
    },
    status: {
      type: String,
      default: "Pending"
    },
    upd_date: {
      type: Date,
    },
    upd_remarks: {
      type: String
    },
    emp_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee_model",
      // required: true
    }
}) 

const entry_model = mongoose.model("Entry", entrySchema);

module.exports = entry_model;