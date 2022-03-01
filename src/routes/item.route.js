const express = require("express");
const authorization = require("../middlewares/auth.middleware");
const Drink = require("../controllers/item.controller");
const router = express.Router();
// creating routes to the endpoints
router.post(
  "/add-item",
  authorization.authorization,
  authorization.isAdmin,
  Drink.addItems
);
router.get("/fetch-items", authorization.authorization, Drink.fetchItems);
router.patch(
  "/update-item",
  authorization.authorization,
  authorization.isAdmin,
  Drink.updateItems
);
router.delete(
  "/remove-item",
  authorization.authorization,
  authorization.isAdmin,
  Drink.deleteItem
);
// exporting all routes

module.exports = router;
