const Items = require("../models/item.model");
const mongoose = require("mongoose");

//  Posting items to the database
exports.addItems = async (req, res, next) => {
  try {
    const { name, manufacturerCompany, quantityAvailable, expiryDate } =
      req.body;
    if (
      !name ||
      !manufacturerCompany ||
      !quantityAvailable ||
      !expiryDate
    ) {
      return res.status(400).json({
        message: "Please fill all the required field.",
      });
    }
//  creating an instance of the created item model
    const newItems = new Items({
      name,
      manufacturerCompany,
      quantityAvailable,
      expiryDate,
    });
//  saving data to the database
    await newItems.save();
    return res.status(201).json({
      newItems,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: `${error.message}, Please try again later.`,
    });
  }
};
//  Getting items from the database
exports.fetchItems = async (req, res, next) => {
  try {
    const fetchItems = await Items.find();
    return res.status(200).json({
      fetchItems
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: `${error.message}, Please try again later.`,
    });
  }
};
//  Updating/editting items in the database
exports.updateItems = async (req, res, next) => {
  try {
    const { _id } = req.query;
    const itemm = await Items.findOne({ _id })
    if(req.body.name.toLowerCase() == itemm.name){
        return res.status(200).json({
          message: `No update has been done, Pls update to another name.`
        });
    }
    const ItemsUpdate = await Items.findOneAndUpdate({ _id }, req.body, {
      new: true,
    });
    return res.status(200).json({
      message: `The  ${Object.keys(req.body)} of '${itemm.name}' has been updated to '${Object.values(req.body)}' successfully.`,
      ItemsUpdate,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: `${error.message}, Please try again later.`,
    });
  }
};

//  deleting goods in the database
exports.deleteItem = async (req, res, next) => {
  try {
    const { _id } = req.query;
    const removeItem = await Items.findOneAndDelete({ _id });
    return res.status(200).json({
      message: `${removeItem.name} has been deleted successfully and is no longer available.`,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: `${error.message}, Please try again later.`,
    });
  }
};
