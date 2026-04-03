import express from "express";
import auth from "../middleware/authMiddleware.js";
import {
  promoteToAdmin,
  demoteToUser,
  getPendingArticles,
  approveArticle,
  rejectArticle,
  getAllArticles
} from "../controllers/adminController.js";


const router = express.Router();

/**
 * Only OWNER can manage roles
 * @route   PUT /api/admin/articles
 * @desc    Promote a user to admin
 * @access  OWNER
 */
router.put("/users/:id/promote", 
  auth(["owner"]), 
  promoteToAdmin
)
/**
 * Only OWNER can manage roles
 * @route   PUT /api/admin/articles
 * @desc    Promote a user to admin
 * @access  OWNER
 */
router.put("/users/:id/demote", 
  auth(["owner"]), 
  demoteToUser
);
/**
 * @route   GET /api/admin/pendingArticles
 * @desc    get all Pending articles
 * @access  Admin
 */
router.get("/pendingArticles", 
  auth(["admin"]), 
  getPendingArticles
);
/**
 * @route   GET /api/admin/allArticles
 * @desc    Get all articles
 * @access  Admin
 */
router.get("/allArticles", 
  auth(["admin"]), 
  getAllArticles
);
/**
 * @route   PUT /api/admin/articles/:id/approve
 * @desc    Approve the article
 * @access  Admin
 */
router.put("/articles/:id/approve", 
  auth(["admin"]), 
  approveArticle
);
/**
 * @route   DELETE /api/admin/articles/:id
 * @desc    Register a new user
 * @access  Public
 */
router.delete("/articles/:id", 
  auth(["admin"]), 
  rejectArticle
);

export default router;