import { Router } from "express";
import * as customerHandler from "../controllers/customer-controller.js";

const customerRouter = Router();

customerRouter.get("/", customerHandler.getAllCustomersHandler);
customerRouter.post("/", customerHandler.addCustomerHandler);

customerRouter.get("/:id", customerHandler.getCustomerHandler);
customerRouter.put("/:id", customerHandler.updateCustomerHandler);
customerRouter.delete("/:id", customerHandler.deleteCustomerHandler);

export default customerRouter;