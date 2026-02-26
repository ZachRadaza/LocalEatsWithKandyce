import { Router } from "express";
import itemRouter from "./item-router.js";
import customerRouter from "./customer-router.js";
import categoryRouter from "./category-router.js";
import orderItemRouter from "./order_item-router.js";
import orderRouter from "./order-router.js";
import emailRouter from "./email-router.js";

const router = Router();

router.get("/health", (req, res) => {
    res.status(200).json({ 
        success: true,
        ok: true 
    });
});

router.use("/category", categoryRouter);
router.use("/item", itemRouter);
router.use("/orderitem", orderItemRouter);
router.use("/customer", customerRouter);
router.use("/order", orderRouter);
router.use("/email", emailRouter);

export default router;