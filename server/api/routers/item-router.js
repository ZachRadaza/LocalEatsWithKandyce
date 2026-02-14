import { Router } from "express";
import * as itemHandler from "../controllers/item-controller.js";

const itemRouter = Router();

itemRouter.get("/", itemHandler.getAllItemsHandler);
itemRouter.post("/", itemHandler.addItemHandler);

itemRouter.get("/:id", itemHandler.getItemHandler);
itemRouter.put("/:id", itemHandler.updateItemHandler);
itemRouter.delete("/:id", itemHandler.deleteItemHandler);

itemRouter.get("/from/:categoryid", itemHandler.getItemsFromCategoryHandler);

export default itemRouter;