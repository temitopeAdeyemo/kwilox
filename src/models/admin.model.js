const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Using the mongoose schema method to create admin schema
const AdminSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    lowercase: true
  },
  lastName: {    type: String,
    required: true,
    lowercase: true
  },
  age: {
    type: Number,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  phoneNumber: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 12
  },
  role: {
    type: String,
    required: true,
    default: "Admin",
    enum: ["Admin"]
  }
},
{
  timestamps: true
});
// creating a model of the created schema
const AdminModel = mongoose.model("Admin", AdminSchema);
// exporting the created model
module.exports = AdminModel;