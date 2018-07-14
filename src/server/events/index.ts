import { Router } from "express";
import * as validationParams from "./validators/events";
import * as handlers from "./handler";

const router = Router();
router.get("/", validationParams.getValidation, handlers.getEvents);
router.post("/", validationParams.postValidation, handlers.createEvents);
router.delete("/", validationParams.deleteValidation, handlers.deleteEvents); //TODO: To implement deletion of multiple events
router.patch("/", validationParams.updateValidation, handlers.editEvents);
router.post("/swap", handlers.requestSwap);

export default router;
