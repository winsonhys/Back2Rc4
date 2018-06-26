import { Router } from "express";
import * as validationParams from "./validators/events";
import * as handlers from "./handler";

const router = Router();
router.get("/", validationParams.getValidation, handlers.getEvent);
router.post("/", validationParams.postValidation, handlers.createEvent);

export default router;
