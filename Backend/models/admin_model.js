const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "email is require"],
  },
  password: {
    type: String,
    required: [true, "password is require"],
  }
});

const admin_model = mongoose.model("Admin", adminSchema);

module.exports = admin_model;