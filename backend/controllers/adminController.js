import Article from "../models/Article.js";
import User from "../models/User.js";

/**
 * @desc Promote user to admin
 * @route PUT /api/admin/users/:id/promote
 * @access OWNER ONLY
 */

const promoteToAdmin = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({error: "User not found"})
        }

        user.role = "admin";
        await user.save();

        res.json({
            message: "User promoted to admin",
            user,
        })
    }   catch (err) {
        res.status(500).json({ error: err.message })
    }
}

/**
 * @desc Demote admin to user
 * @route PUT /api/admin/users/:id/demote
 * @access OWNER ONLY
 */
const demoteToUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.role = "user";
        await user.save();

        res.json({
            message: "User demoted to user",
            user,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * @desc    Get all articles that are waiting for approval
 * @route   GET /api/admin/articles
 * @access  Admin only
 */
const getPendingArticles = async (req, res) => {
    try {
        // Find all articles with status "pending"
        const articles = await Article.find({ status: "pending" })
        .sort({ createdAt: -1 }); // newest first

        // Return the list of pending articles
        res.json(articles);
    } catch (err) {
        // Handle unexpected errors
        res.status(500).json({ error: err.message });
    }
};

/**
 * @desc    Approve an article
 * @route   PUT /api/admin/articles/:id/approve
 * @access  Admin only
 */
const approveArticle = async (req, res) => {
    try {
        const articleId = req.params.id;

        // Find article by ID and update its status to "approved"
        const article = await Article.findByIdAndUpdate(
            articleId,
            { status: "approved" },
            { new: true } // return updated document
        );

        // If article does not exist
        if (!article) {
            return res.status(404).json({ error: "Article not found" });
        }

        res.json({
            message: "Article approved successfully",
            article,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * @desc    Reject (delete) an article
 * @route   DELETE /api/admin/articles/:id
 * @access  Admin only
 */
const rejectArticle = async (req, res) => {
    try {
        const articleId = req.params.id;

        // Find and delete the article
        const article = await Article.findByIdAndDelete(articleId);

        // If article does not exist
        if (!article) {
        return res.status(404).json({ error: "Article not found" });
        }

        res.json({
        message: "Article rejected and deleted",
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export {promoteToAdmin, demoteToUser, getPendingArticles, approveArticle, rejectArticle}