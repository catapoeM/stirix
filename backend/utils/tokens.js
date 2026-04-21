import jwt from "jsonwebtoken"

const generateAccessToken = (user) => {
    return jwt.sign(
        {
            sub: user.id,
            role: user.role
        },
        process.env.JWT_SECRET, {
            expiresIn: "15m"
        }
    )
}

const generateRefreshToken = (user) => {
    return jwt.sign(
        { sub: user.id },
        process.env.REFRESH_SECRET,
        { expiresIn: "7d" }
    );
};

export {generateAccessToken, generateRefreshToken}