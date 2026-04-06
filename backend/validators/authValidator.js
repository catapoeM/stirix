import { body } from "express-validator";

const registerValidator = [
  // Username
  body("username")
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be at least 3 characters and maximum of 20")
    .isAlphanumeric()
    .withMessage("Username must contain only letters and numbers")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can contain only letters, numbers and underscore"),
    
  // Email
  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

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