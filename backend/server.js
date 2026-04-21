import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import helmet from "helmet"

import authRoutes from "./routes/authRoutes.js"
import articleRoutes from "./routes/articleRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import cookieParser from "cookie-parser"

import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT;

const app = express();

connectDB();

app.use(helmet())
app.use(cors({
    origin: process.env.FRONTEND_URI, // the Next.js app local host 
    credentials: true, // REQUIRED to TRUE
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/articles", articleRoutes)
app.use("/api/admin", adminRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

