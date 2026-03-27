import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const hash = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hash,
        });

        await user.save();

        res.json({ message: "User created" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user)  {
            return res.status(400).json({ error: "User not found" });
        } 

        const valid = await bcrypt.compare(password, user.password);
        if (!valid)  {
            return res.status(400).json({ error: "Parola incorecta" });
        } 

        const token = jwt.sign(
        { 
            id: user._id, 
            role: user.role 
        },
        process.env.JWT_SECRET
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

