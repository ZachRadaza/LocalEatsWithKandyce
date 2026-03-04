import { Router } from "express";
import * as orderItemHandler from "../controllers/order_item-controller.js";
import { requireAdmin } from "../middleware/require-admin.js";

const orderItemRouter = Router();

orderItemRouter.get("/", orderItemHandler.getAllOrderItemsHandler);
orderItemRouter.post("/", orderItemHandler.addOrderItemHandler);

orderItemRouter.get("/:id", orderItemHandler.getOrderItemHandler);
orderItemRouter.put("/:id", requireAdmin, orderItemHandler.updateOrderItemHandler);
orderItemRouter.delete("/:id", requireAdmin, orderItemHandler.deleteOrderItemHandler);

orderItemRouter.get("/from/:orderid", orderItemHandler.getAllOrderItemsFromHandler);

export default orderItemRouter;