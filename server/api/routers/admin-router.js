import { Router } from "express";
import rateLimit from "express-rate-limit";
import * as adminHandler from "../controllers/admin-controller.js";
import { requireAdmin } from "../middleware/require-admin.js";

const adminRouter = Router();

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 mins
    max: 10,                  // 10 tries per ^
    standardHeaders: true,
    legacyHeaders: false,
});

adminRouter.post("/login", loginLimiter, adminHandler.adminLogin);
adminRouter.post("/logout", adminHandler.adminLogout);
adminRouter.get("/me", requireAdmin, adminHandler.adminMe);

export default adminRouter;