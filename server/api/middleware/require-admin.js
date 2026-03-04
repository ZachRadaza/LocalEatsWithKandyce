import jwt from "jsonwebtoken";

const COOKIE_NAME = "admin_token";

export function requireAdmin(req, res, next){
    try {
        const token = req.cookies?.[COOKIE_NAME];
        if(!token) 
            return res.status(401).json({
                success: false, 
                error: "Not authenticated" 
            });

        const jwtSecret = process.env.JWT_SECRET;

        if(!jwtSecret) 
            return res.status(500).json({ 
                success: false, 
                error: "Server misconfigured" 
            });

        const payload = jwt.verify(token, jwtSecret);

        if(payload?.role !== "admin")
            return res.status(403).json({ 
                success: false, 
                error: "Forbidden" 
            });

        next();
    } catch {
        return res.status(401).json({ 
            success: false, 
            error: "Not authenticated" 
        });
    }
}