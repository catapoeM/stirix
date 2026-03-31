import { body } from "express-validator";

const registerValidator = [
  // Username
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters"),
  
  body("username")
    .isAlphanumeric()
    .withMessage("Username must contain only letters and numbers"),
  // Email
  body("email")
    .isEmail()
    .withMessage("Invalid email format"),

  // Password
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

const loginValidator = [
  body("email")
    .isEmail()
    .withMessage("Invalid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];

export {registerValidator, loginValidator}