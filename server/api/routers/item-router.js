import { Router } from "express";
import multer from "multer";
import * as itemHandler from "../controllers/item-controller.js";
import { requireAdmin } from "../middleware/require-admin.js";

const itemRouter = Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

itemRouter.get("/", itemHandler.getAllItemsHandler);
itemRouter.post("/", upload.single("file"), itemHandler.addItemHandler);

itemRouter.get("/:id", itemHandler.getItemHandler);
itemRouter.put("/:id", requireAdmin, upload.single("file"), itemHandler.updateItemHandler);
itemRouter.delete("/:id", requireAdmin, itemHandler.deleteItemHandler);

itemRouter.get("/from/:categoryid", itemHandler.getItemsFromCategoryHandler);

itemRouter.get("/custom/", requireAdmin, itemHandler.getAllItemsCustomHandler);

export default itemRouter;