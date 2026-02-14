import { Router } from "express";
import * as orderHandler from "../controllers/order-controller.js";

const orderRouter = Router();

orderRouter.get("/", orderHandler.getAllOrdersHandler);
orderRouter.post("/", orderHandler.addOrderHandler);

orderRouter.get("/:id", orderHandler.getOrderHandler);
orderRouter.put("/:id", orderHandler.updateOrderHandler);
orderRouter.delete("/:id", orderHandler.deleteOrderHandler);

export default orderRouter;