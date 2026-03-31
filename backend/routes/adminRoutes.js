import express from "express";
import auth from "../middleware/authMiddleware.js";
import {
  promoteToAdmin,
  demoteToUser,
  getPendingArticles,
  approveArticle,
  rejectArticle,
} from "../controllers/adminController.js";


const router = express.Router();

/**
 * Only OWNER can manage roles
 * @route   PUT /api/admin/articles
 * @desc    Promote a user to admin
 * @access  OWNER
 */
router.put("/users/:id/promote", auth(["owner"]), promoteToAdmin)
/**
 * Only OWNER can manage roles
 * @route   PUT /api/admin/articles
 * @desc    Promote a user to admin
 * @access  OWNER
 */
router.put("/users/:id/demote", auth(["owner"]), demoteToUser);
/**
 * @route   GET /api/admin/articles
 * @desc    Register a new user
 * @access  Public
 */
router.get("/articles", auth(["admin"]), getPendingArticles);
/**
 * @route   PUT /api/admin/articles/:id/approve
 * @desc    Register a new user
 * @access  Public
 */
router.put("/articles/:id/approve", auth(["admin"]), approveArticle);
/**
 * @route   DELETE /api/admin/articles/:id
 * @desc    Register a new user
 * @access  Public
 */
router.delete("/articles/:id", auth(["admin"]), rejectArticle);

export default router;