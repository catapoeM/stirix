import Article from "../models/Article.js";

/**
 * @desc    Get all approved articles
 * @route   GET /api/articles
 * @access  Public (anyone can read)
 */
const getApprovedArticles = async (req, res) => {
    try {
        // get articles by category
        const { category } = req.query;

        const filter = {
            status: "approved"
        }

        if (category && category !== "all") {
            filter.category = category;
        }
        // Find all articles with status "approved"
        const articles = await Article.find(filter)
        .sort({ createdAt: -1 }); // Sort by newest first

        // If there are not approved articles we check it by the length of the array
        if (Array.isArray(articles) && articles.length < 1) {
            return res.status(404).json({message: "No Approved articles found"})
        }
        // Send articles as JSON response
        res.json(articles);
    } catch (err) {
        // Handle server errors
        res.status(500).json({ error: err.message });
    }
};

/**
 * @desc    Get all of my articles by createdAt
 * @route   GET /api/articles/myArticles
 * @access  Private
 */
const getMyArticles = async (req, res) => {
    try {
        const authorId = req.user.id;

        // Find article by ID
        const articles = await Article.find({
            author: authorId,

        }).sort({ createdAt: -1 })

        // If article does not exist
        if (!articles) {
            return res.status(404).json({ error: "Articles not found" });
        }

        res.json(articles);
    } catch (err) {
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
            return res.status(403).json({ error: "Article hidden or not approved yet" });
        }

        res.json(article);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * @desc    Get a single article by ID
 * @route   GET /api/articles/:id
 * @access  Public
 */
const getArticleByIdAsWriterOrAdmin = async (req, res) => {
    try {
        const articleId = req.params.id;
        const userId = req.user.id;

        // Find article by ID
        const article = await Article.findById(articleId);

        // If article does not exist
        if (!article) {
            return res.status(404).json({ error: "Article not found" });
        }

        // Optional: only allow viewing approved articles
        if (article.author.toString() !== userId &&
            req.user.role !== "admin" &&
            req.user.role !== "owner"
        ) {
            return res.status(403).json({ error: "Not authorized" });
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
        const { title, content, category, summary } = req.body;

        // Basic validation (important!)
        if (!title || !content) {
            return res.status(400).json({ error: "Title and content are required" });
        }

        // Create new article with "pending" status
        const article = new Article({
            title,
            content,
            category,
            summary,
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
 * @desc    Hide an article (Soft delete)
 * @route   PUT /api/articles/:id
 * @access  Private (author or admin)
 */
const hideArticle = async (req, res) => {
    try {
        const articleId = req.params.id;

        // Find article
        const article = await Article.findById(articleId);

        if (!article) {
            return res.status(404).json({ error: "Article not found" });
        }

        // Check ownership or admin

        if (
            article.author.toString() !== req.user.id && req.user.role !== "admin"
        ) {
            return res.status(403).json({ error: "Not allowed" });
        }

        // Hide article
        article.status = "hidden";
        await article.save();

        res.json({
            message: "Article hidden successfully",
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export {getApprovedArticles, getMyArticles, getArticleById, getArticleByIdAsWriterOrAdmin, createArticle, hideArticle}