import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import helmet from "helmet"

import authRoutes from "./routes/authRoutes.js"
import articleRoutes from "./routes/articleRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"

import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT;

const app = express();

connectDB();

app.use(helmet())
app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/articles", articleRoutes)
app.use("/api/admin", adminRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

