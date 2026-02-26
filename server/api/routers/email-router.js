import { Router } from "express";
import * as emailHandler from "../controllers/email-controller.js";

const emailRouter = Router();

emailRouter.post("/confirmation", emailHandler.confimationHandler);
emailRouter.post("/accept", emailHandler.acceptHandler);
emailRouter.post("/decline", emailHandler.declineHandler);
emailRouter.post("/reminder", emailHandler.reminderHandler);
emailRouter.post("/complete", emailHandler.completeHandler);

export default emailRouter;