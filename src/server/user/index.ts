import { Router } from "express";
import getHandler from "./handler/create";
import validationParams from "./validators/create";

const router = Router();

router.get("/", validationParams, getHandler);

export default router;
