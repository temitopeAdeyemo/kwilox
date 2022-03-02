const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Using the mongoose schema method to create item schema
const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
    manufacturerCompany: {
      type: String,
      required: true,
      lowercase: true,
    },
    quantityAvailable: {
      type: Number,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
// creating a model of the created schema
const itemModel = mongoose.model("Items", itemSchema);
// exporting the created model
module.exports = itemModel;
