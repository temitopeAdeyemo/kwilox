const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Using the mongoose schema method to create user schema
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    lowercase: true
  },
  lastName: {
    type: String,
    required: true,
    lowercase: true
  },
  age: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
password: {
    type: String,
    required: true,
  },
role: {
    type: String,
    enum: ["User"],
    default: "User"
  }
},
{
    timestamps: true
});
// creating a model of the created schema
const userModel = mongoose.model("user", userSchema);
// exporting the created model
module.exports = userModel;
