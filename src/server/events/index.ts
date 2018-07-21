import { Router } from "express";
import * as validationParams from "./validators/events";
import * as handlers from "./handler";

const router = Router();
router.get("/", handlers.getEvents);
router.post("/", validationParams.postValidation, handlers.createEvents);
router.delete("/", validationParams.deleteValidation, handlers.deleteEvents); //TODO: To implement deletion of multiple events
router.patch("/", validationParams.updateValidation, handlers.editEvents);
router.post(
  "/swapRequest",
  validationParams.swapValidation,
  handlers.requestSwap
);
router.post("/eventSwap", validationParams.swapValidation, handlers.eventSwap);

export default router;
