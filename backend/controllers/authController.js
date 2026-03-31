import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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

        const token = jwt.sign(
        { 
            id: user._id, 
            role: user.role 
        },
        process.env.JWT_SECRET,
        {expiresIn: "7d"}
        );

        res.json({
            token,
            role: user.role,
            username: user.username,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export {register, login}

