const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;
// calling express.json to post and get datas in json formats
app.use(express.json());

const DrinkRouter = require("./routes/item.route");
const userRouter = require("./routes/user.route");
const adminRouter = require("./routes/admin.route");
const connectDB = require("./database/db")
//endpoint for the base url
app.get("/", (req,res)=>{
  res.send("Welcome to Kwilox, How can we serve you better today?")
})
// creating a router path for app
app.use("/api/v1", DrinkRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", adminRouter);
// calling the database function
connectDB();
app.listen(PORT, () => {
  console.log(`App is listening to PORT ${PORT}`);
});

