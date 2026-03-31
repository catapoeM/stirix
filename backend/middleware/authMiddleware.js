import jwt from "jsonwebtoken"

// This function returns a middleware
// "roles" = array of allowed roles (e.g. ["admin"])
// If no roles are provided → any logged-in user is allowed
const auth = (roles = []) => {
    return (req, res, next) => {

        // 1. Get token from Authorization header
        // Expected format: "Bearer TOKEN"
        const authHeader = req.headers.authorization;

        // If no header -> user is not authenticated
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({error: "No token provided / Invalid token format" })
        }
        
        // Extract token (second part after "Bearer")
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ error: "No token" });
        }

        try {
            // 2. Verify and decode token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // 3. Attach user data to request
            req.user = decoded;

            // 4. Check user role (if roles are specified)
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({ error: "Forbidden" });
            }

            // 5. Continue to next middleware / route
            next();
        } catch {
            // If token is invalid or expired
            res.status(401).json({ error: "Invalid token" });
        }
    };
};

export default auth