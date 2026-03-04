import { Router } from "express";
import * as customerHandler from "../controllers/customer-controller.js";
import { requireAdmin } from "../middleware/require-admin.js";

const customerRouter = Router();

customerRouter.get("/", requireAdmin, customerHandler.getAllCustomersHandler);
customerRouter.post("/", customerHandler.addCustomerHandler);

customerRouter.get("/:id", requireAdmin, customerHandler.getCustomerHandler);
customerRouter.put("/:id", requireAdmin, customerHandler.updateCustomerHandler);
customerRouter.delete("/:id", requireAdmin, customerHandler.deleteCustomerHandler);

export default customerRouter;