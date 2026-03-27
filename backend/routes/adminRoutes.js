import express from "express";
import auth from "../middleware/authMiddleware.js";
import {
  getPendingArticles,
  approveArticle,
  rejectArticle,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/articles", auth(["admin"]), getPendingArticles);
router.put("/articles/:id/approve", auth(["admin"]), approveArticle);
router.delete("/articles/:id", auth(["admin"]), rejectArticle);

export default router;