const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
// creating a new reminder async function taking req, res and next as callbacks to create a user
exports.userRegistration = async (req, res, next) => {
  try {
    const { firstName, lastName, age, email, password, phoneNumber, role } = req.body;
// condition to require all required field
    if ( !firstName || !lastName || !age || !email || !password || !phoneNumber || !role ) {
      return res.status(401).json({
        message: "Please fill all the required field",
      });
    }
// authenticating and validating email to validate if user is registering with an existing email
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        message: "  This email already exist, pls log in",
      });
    }
// validating and hashing password
    if(password.length < 8){
      return res.status(401).json({
        message: "Password too short.",
      });
    }    
    const hashPassword = await bcrypt.hash(password, 10);
    const newKwiloxUser = new User({
      firstName,
      lastName,
      age,
      email,
      password: hashPassword,
      phoneNumber,
      role,
    });
    await newKwiloxUser.save();
    return res.status(201).json({
      message: `Hi ${firstName.toUpperCase()}, Your account has been created successfully. Please check your email for verification.`,
      newKwiloxUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `${error.message}, Try again later.`,
    });
  }
};

exports.allUsers = async (req, res, next) => {
  try {
    const fetchUsers = await User.find();
    return res.status(200).json({
      fetchUsers,
    });
  } catch (error) {
    return res.status(500).json({
      message: `${error.message}, Please try again later.`,
    });
  }
};

//  Searching for a user from the database

exports.fetchUser = async (req, res, next) => {
  try {
    const {email} = req.query
    const fetchOneUser = await User.findOne({email});
    return res.status(200).json({
      fetchOneUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: `${error.message}, Please try again later.`,
    });
  }
};
// user login
exports.userLogin = async (req, res, next) => {
  try {
// destructuring email and password into the request body
    const { email, password } = req.body;
    if ( !email || !password) {
      return res.status(400).json({
        message: "Please fill all the required field",
      });
    }
    const emailExists = await User.findOne({ email });
// validating email before login
    if (emailExists == null) {
      return res.status(404).json({
        message: "Email does not exist, please sign up",
      });
    }
// validating the password before login 
    const correctPassword = await bcrypt.compare(
      password,
      emailExists.password
    );
    if (!correctPassword) {
      return res.status(401).json({
        message: "Login unsuccessful, incorrect login details.",
      });
    }
// creating a payload
    const data = {
      id: emailExists._id,
      email: emailExists.email,
      role: emailExists.role,
    };
// getting a secret token when login is successful
    const secret_key = process.env.jwt_token;
    const token = await jwt.sign(data, secret_key, { expiresIn: "2h" });
    return res.status(200).json({
      message: `Hi ${emailExists.lastName.toUpperCase()} ${emailExists.firstName.toUpperCase()}, Welcome Back`,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `${error.message}, Try again later.`,
    });
  }
};