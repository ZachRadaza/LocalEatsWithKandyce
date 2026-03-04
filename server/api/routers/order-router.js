import { Router } from "express";
import * as orderHandler from "../controllers/order-controller.js";
import { requireAdmin } from "../middleware/require-admin.js";

const orderRouter = Router();

orderRouter.get("/", requireAdmin, orderHandler.getAllOrdersHandler);
orderRouter.post("/", orderHandler.addOrderHandler);

orderRouter.get("/:id", requireAdmin, orderHandler.getOrderHandler);
orderRouter.put("/:id", requireAdmin, orderHandler.updateOrderHandler);
orderRouter.delete("/:id", requireAdmin, orderHandler.deleteOrderHandler);

export default orderRouter;