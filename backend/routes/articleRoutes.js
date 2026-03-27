import express from "express";

// Import controller functions
import {
    getApprovedArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
} from "../controllers/articleController.js";

// Import auth middleware
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route   GET /api/articles
 * @desc    Get all approved articles
 * @access  Public
 */
router.get("/", getApprovedArticles);

/**
 * @route   GET /api/articles/:id
 * @desc    Get single article by ID
 * @access  Public (only if approved - checked in controller)
 */
router.get("/:id", getArticleById);

/**
 * @route   POST /api/articles
 * @desc    Create new article
 * @access  Private (logged-in users)
 */
router.post("/", auth(), createArticle);

/**
 * @route   PUT /api/articles/:id
 * @desc    Update an article
 * @access  Private (author or admin)
 */
router.put("/:id", auth(), updateArticle);

/**
 * @route   DELETE /api/articles/:id
 * @desc    Delete an article
 * @access  Private (author or admin)
 */
router.delete("/:id", auth(), deleteArticle);

export default router;