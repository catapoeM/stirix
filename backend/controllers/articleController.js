import Article from "../models/Article.js";

/**
 * @desc    Get all approved articles
 * @route   GET /api/articles
 * @access  Public (anyone can read)
 */
const getApprovedArticles = async (req, res) => {
    try {
        // Find all articles with status "approved"
        const articles = await Article.find({ status: "approved" })
        .sort({ createdAt: -1 }); // Sort by newest first

        // Send articles as JSON response
        res.json(articles);
    } catch (err) {
        // Handle server errors
        res.status(500).json({ error: err.message });
    }
};

/**
 * @desc    Get a single article by ID
 * @route   GET /api/articles/:id
 * @access  Public
 */
const getArticleById = async (req, res) => {
    try {
        const articleId = req.params.id;

        // Find article by ID
        const article = await Article.findById(articleId);

        // If article does not exist
        if (!article) {
            return res.status(404).json({ error: "Article not found" });
        }

        // Optional: only allow viewing approved articles
        if (article.status !== "approved") {
            return res.status(403).json({ error: "Article not approved yet" });
        }

        res.json(article);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * @desc    Create a new article (sent for approval)
 * @route   POST /api/articles
 * @access  Private (logged-in users)
 */
const createArticle = async (req, res) => {
    try {
        const { title, content, category } = req.body;

        // Basic validation (important!)
        if (!title || !content) {
            return res.status(400).json({ error: "Title and content are required" });
        }

        // Create new article with "pending" status
        const article = new Article({
            title,
            content,
            category,
            author: req.user.id, // comes from auth middleware
            status: "pending",
        });

        // Save to database
        await article.save();

        res.status(201).json({
            message: "Article submitted for review",
            article,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * @desc    Update an article (optional feature)
 * @route   PUT /api/articles/:id
 * @access  Private (author or admin)
 */
const updateArticle = async (req, res) => {
    try {
        const articleId = req.params.id;
        const { title, content, category } = req.body;

        // Find article
        const article = await Article.findById(articleId);

        if (!article) {
            return res.status(404).json({ error: "Article not found" });
        }

        // Check if user is the author OR admin
        if (
            article.author !== req.user.id &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({ error: "Not allowed" });
        }

        // Update fields if provided
        if (title){
            article.title = title;
        } 
        if (content) {
            article.content = content;
        }
        if (category) {
            article.category = category;
        } 

        // Optional: reset status to pending after edit
        article.status = "pending";

        await article.save();

        res.json({
            message: "Article updated and sent for re-approval",
            article,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * @desc    Delete an article
 * @route   DELETE /api/articles/:id
 * @access  Private (author or admin)
 */
const deleteArticle = async (req, res) => {
    try {
        const articleId = req.params.id;

        // Find article
        const article = await Article.findById(articleId);

        if (!article) {
            return res.status(404).json({ error: "Article not found" });
        }

        // Check ownership or admin
        if (
            article.author !== req.user.id &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({ error: "Not allowed" });
        }

        // Delete article
        await Article.findByIdAndDelete(articleId);

        res.json({
            message: "Article deleted successfully",
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export {getApprovedArticles, getArticleById, createArticle, updateArticle, deleteArticle}