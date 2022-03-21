const Admin = require("../models/admin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const {
  validateAdminReg,
  validateAdminLogin,
} = require("../middlewares/joiValidateAdmin");
// creating a new reminder async function taking req, res and next as callbacks to create a admin
exports.adminRegistration = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      age,
      emailAddress,
      password,
      phoneNumber,
      role,
    } = req.body;

    const validatedData = await validateAdminReg.validateAsync(req.body);

    // // condition to require all required field
    // if (
    //   !firstName ||
    //   !lastName ||
    //   !age ||
    //   !emailAddress ||
    //   !password ||
    //   !phoneNumber ||
    //   !role
    // ) {
    //   return res.status(400).json({
    //     message: "Please fill all the required field",
    //   });
    // }
    // authenticating and validating email to validate if admin is registering with an existing email
    const emailExists = await Admin.findOne({
      emailAddress: validatedData.emailAddress,
    });
    if (emailExists) {
      return res.status(409).json({
        message: "This email already exist, Please log in",
      });
    }
    // if (!emailAddress.includes("@")) {
    //   return res.status(400).json({
    //     message: "Invalid Email.",
    //   });
    // }

    // // validating and hashing password
    if (password.length < 8) {
      return res.status(403).json({
        message: "Password too short.",
      });
    }
    if (
      validatedData.password.includes(firstName) ||
      validatedData.password.includes(lastName)
    ) {
      return res.status(403).json({
        message: "Password too Weak",
      });
    }
    const hashPassword = await bcrypt.hash(validatedData.password, 10);
    const newKwiloxAdmin = new Admin({
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      age: validatedData.age,
      emailAddress: validatedData.emailAddress,
      password: hashPassword,
      phoneNumber: validatedData.phoneNumber,
      role,
    });
    await newKwiloxAdmin.save();
    return res.status(201).json({
      message: `Hi ${firstName.toUpperCase()}, Your account has been created successfully. Please check your email for verification.`,
      newKwiloxAdmin,
    });
  } catch (error) {
    return res.status(500).json({
      message: `${error.message}, Try again  later.`,
    });
  }
};
// login in an admin
exports.adminLogin = async (req, res, next) => {
  try {
    // // destructuring email and password into the request body
    // const { emailAddress, password } = req.body;
    const validatedLoginData = await validateAdminLogin.validateAsync(req.body);
    // // requiring email and password
    // if (!emailAddress || !password) {
    //   return res.status(400).json({
    //     message: "Please fill all the required field",
    //   });
    // }
    const emailExists = await Admin.findOne({
      emailAddress: validatedLoginData.emailAddress,
    });
    // validating email before login
    if (emailExists == null) {
      return res.status(404).json({
        message:
          "Email does not exist, please sign up as a user if you are not an admin",
      });
    }
    // validating the password before login
    const correctPassword = await bcrypt.compare(
      validatedLoginData.password,
      emailExists.password
    );
    if (!correctPassword) {
      return res.status(401).json({
        message: "Login unsuccessful, Please verify your login details.",
      });
    }
    // creating a payload
    const data = {
      id: emailExists._id,
      email: emailExists.emailAddress,
      role: emailExists.role,
    };
    // getting a secret token when login is successful
    const secret_key = process.env.JWT_TOKEN;
    const token = await jwt.sign(data, secret_key, { expiresIn: "1h" });
    return res.status(200).json({
      message: `Hi ${emailExists.lastName.toUpperCase()} ${emailExists.firstName.toUpperCase()}, Welcome Back`,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `${error.message}, Try again later.`,
    });
  }
};
