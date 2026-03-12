import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const COOKIE_NAME = "admin_token";

export async function adminLogin(req, res) {
    try{
        const { password } = req.body;

        if(typeof password !== "string" || !password)
            return res.status(400).json({ 
                success: false, 
                error: "Missing password" 
            });
        

        const hash = process.env.ADMIN_PASSWORD_HASH;
        const jwtSecret = process.env.JWT_SECRET;

        if(!hash || !jwtSecret){
            console.error("Missing ADMIN_PASSWORD_HASH or JWT_SECRET in env");
            return res.status(500).json({ 
                success: false, 
                error: "Server misconfigured" 
            });
        }

        const ok = await bcrypt.compare(password, hash);

        if(!ok)
            return res.status(401).json({ 
                success: false, 
                error: "Invalid password" 
            });

        const token = jwt.sign({ role: "admin" }, jwtSecret, { expiresIn: "7d" });

        res.cookie(COOKIE_NAME, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/",
        });

        return res.status(200).json({ success: true });
    } catch(error){
        console.error("adminLogin error:", error);
        return res.status(500).json({ 
            success: false, 
            error: "Server error" 
        });
    }
}

export function adminLogout(req, res) {
    res.clearCookie(COOKIE_NAME, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
    });

    return res.status(200).json({ 
        success: true 
    });
}

export function adminMe(req, res){
    return res.status(200).json({ 
        success: true, 
        data: true 
    });
}