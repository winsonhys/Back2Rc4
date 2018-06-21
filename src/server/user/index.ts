import { Router } from "express";
import * as validationParams from "./validators/user";
import * as handlers from "./handler";

const router = Router();
router.get("/", validationParams.getValidation, handlers.getUser);
router.post("/", validationParams.postValidation, handlers.createUser);
// router.delete("/", validationParams, handlers.deleteUser);

export default router;
