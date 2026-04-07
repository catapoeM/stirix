import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
    {
        title: { 
            type: String, 
            required: true, 
            minlength: 4, 
            maxlength: 80 
        },
        content: { 
            type: String, 
            required: true, 
            minlength: 100, 
            maxlength: 1000 
        },
        category: {
            type: String,  // football
            enum: ["superliga", "romania", "international", "all"], 
            required: true
        },
        imageUrl: {
            type: String
        },
        summary: {
            type: String, 
            required: false, 
            minlength: 150, 
            maxlength: 300
        },
        author: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User"
        },
        status: { 
            type: String, 
            enum: ["pending", "approved", "hidden", "rejected"], 
            default: "pending"
        },
        createdAt: {
            type: Date, 
            default: Date.now
        }
    }
)

export default mongoose.model("Article", ArticleSchema)
