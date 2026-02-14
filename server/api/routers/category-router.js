import { Router } from "express";
import * as categoryHandler from "../controllers/category-controller.js"

const categoryRouter = Router();

categoryRouter.get("/", categoryHandler.getAllCategoriesHandler);
categoryRouter.post("/", categoryHandler.addCategoryHandler);

categoryRouter.get("/:id", categoryHandler.getCategoryHandler);
categoryRouter.put("/:id", categoryHandler.updateCategoryHandler);
categoryRouter.delete("/:id", categoryHandler.deleteCategoryHandler);

export default categoryRouter;