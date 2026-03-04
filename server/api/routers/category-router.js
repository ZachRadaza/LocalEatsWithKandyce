import { Router } from "express";
import * as categoryHandler from "../controllers/category-controller.js"
import { requireAdmin } from "../middleware/require-admin.js";

const categoryRouter = Router();

categoryRouter.get("/", categoryHandler.getAllCategoriesHandler);
categoryRouter.post("/", requireAdmin, categoryHandler.addCategoryHandler);

categoryRouter.get("/:id", categoryHandler.getCategoryHandler);
categoryRouter.put("/:id", requireAdmin, categoryHandler.updateCategoryHandler);
categoryRouter.delete("/:id", requireAdmin, categoryHandler.deleteCategoryHandler);

export default categoryRouter;