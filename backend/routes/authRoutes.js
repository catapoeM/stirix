import express from "express";
import { register, login, refresh, logout } from "../controllers/authController.js";
import validateRequest from "../middleware/validateRequest.js";
import { registerValidator, loginValidator } from "../validators/authValidator.js";
import { authLimiter } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post("/register", 
    authLimiter,
    registerValidator,
    validateRequest,
    register
);

/**
 * @route   POST /api/auth/login
 * @desc    Login user and return JWT
 * @access  Public
 */
router.post("/login", 
    loginValidator,
    validateRequest,
    login
);

// refresh route
router.post("/refresh",
    refresh
)

// logout route
router.post("/logout",
    logout
)

export default router;