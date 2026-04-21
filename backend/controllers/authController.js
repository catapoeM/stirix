import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { generateAccessToken, generateRefreshToken } from "../utils/tokens.js"

/**
 * @desc Register user
 */
const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const username = req.body.username.toLowerCase()
        
        // Check if user exists
        const existingUser = await User.findOne({ 
            $or: [{email}, {username}] 
        })
        if (existingUser) {
            return res.status(400).json( { error: "Email / username already exists "})
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Always create as User
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role: "user",
        });

        res.status(201).json({ 
            message: "User created",
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
            },
         });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * @desc Login user
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user)  {
            return res.status(400).json({ error: "Invalid credentials" });
        } 

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)  {
            return res.status(400).json({ error: "Invalid credentials" });
        } 

        const accessToken = generateAccessToken(user);

        const refreshToken = generateRefreshToken(user);

        //  store refresh token in cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.PRODUCTION,
            sameSite: "strict",
        });

        res.json({accessToken});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const refresh = (req, res) => {
    const token = req.cookies.refreshToken;

    if (!token) return res.sendStatus(401);

    if (!refreshTokens.includes(token)) return res.sendStatus(403);

    try {
        const payload = jwt.verify(token, process.env.REFRESH_SECRET);

        // rotate refresh token
        refreshTokens = refreshTokens.filter((t) => t !== token);

        const newRefreshToken = generateRefreshToken({ id: payload.sub });
        refreshTokens.push(newRefreshToken);

        const newAccessToken = generateAccessToken({ id: payload.sub });

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.PRODUCTION,
            sameSite: "strict",
        });

        res.json({ accessToken: newAccessToken });
    } catch (err) {
        return res.sendStatus(403);
    }
}

const logout = (req, res) => {
    const token = req.cookies.refreshToken;

    refreshTokens = refreshTokens.filter((t) => t !== token);

    res.clearCookie("refreshToken");

    res.sendStatus(204);

}

export {register, login, logout, refresh}

