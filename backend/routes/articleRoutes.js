import express from "express";

// Import controller functions
import {
    getApprovedArticles,
    getMyArticles,
    getArticleById,
    createArticle,
    hideArticle,
    getArticleByIdAsWriterOrAdmin,
} from "../controllers/articleController.js";

import { createArticleValidator } from "../validators/articleValidator.js";
import validateRequest from "../middleware/validateRequest.js";

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
 * @route   GET /api/getMyArticles/
 * @desc    Get all my articles by date
 * @access  Private (only if I am the user - checked in controller)
 */
router.get("/myArticles", 
    auth(),
    getMyArticles
);

/**
 * @route   GET /api/articles/:id
 * @desc    Get single article by ID
 * @access  Public
 */
router.get("/:id",
    getArticleById
);

/**
 * @route   GET /api/articles/my/:id
 * @desc    Get single article by ID
 * @access  Writer or ADMIN
 */
router.get("/my/:id",
    auth(),
    getArticleByIdAsWriterOrAdmin
);


/**
 * @route   POST /api/articles/create
 * @desc    Create new article
 * @access  Private (logged-in users)
 */
router.post("/create", auth(),
    createArticleValidator,
    validateRequest,
    createArticle
);

/**
 * @route   PATCH /api/articles/:id/hide
 * @desc    Hide an article
 * @access  Private (author or admin)
 */
router.patch("/:id/hide", 
    auth(), 
    hideArticle
);

export default router;