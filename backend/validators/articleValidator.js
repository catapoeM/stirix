import { body } from "express-validator";

const createArticleValidator = [
  // 🔹 TITLE
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 4, max: 80 })
    .withMessage("Title must be between 4 and 80 characters")
    .trim()
    .escape(),

  // 🔹 CONTENT
  body("content")
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ min: 100, max: 1000 })
    .withMessage("Content must be at least 100 characters long and maximum of 1000")
    .trim()
    .escape(),

  // 🔹 IMAGE (optional but validated if exists)
  body("imageUrl")
    .optional()
    .isURL()
    .withMessage("Image must be a valid URL"),

  // 🔹 CATEGORY
  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isIn(["superliga", "romania", "europa", "international"])
    .withMessage("Invalid category"),

  // 🔹 OPTIONAL: SUMMARY (nice for preview cards)
  body("summary")
    .optional()
    .isLength({ min: 50, max: 300 })
    .withMessage("Summary cannot exceed 300 characters")
    .trim()
    .escape(),
];

export {createArticleValidator}