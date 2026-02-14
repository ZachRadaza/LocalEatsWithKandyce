import { Router } from "express";
import * as orderItemHandler from "../controllers/order_item-controller.js";

const orderItemRouter = Router();

orderItemRouter.get("/", orderItemHandler.getAllOrderItemsHandler);
orderItemRouter.post("/", orderItemHandler.addOrderItemHandler);

orderItemRouter.get("/:id", orderItemHandler.getOrderItemHandler);
orderItemRouter.put("/:id", orderItemHandler.updateOrderItemHandler);
orderItemRouter.delete("/:id", orderItemHandler.deleteOrderItemHandler);

orderItemRouter.get("/from/:orderid", orderItemHandler.getAllOrderItemsFromHandler);

export default orderItemRouter;