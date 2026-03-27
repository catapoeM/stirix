import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
    title: { type: String, required: true, maxlength: 80 },
    content: { type: String, required: true, minlength: 100, maxlength: 1000 },
    category: String,
    author: String,
    status: { type: String, enum: ["pending", "approved"], default: "pending"},
    createdAt: {type: Date, default: Date.now},
})

export default mongoose.model("Article", ArticleSchema)
