import { Router } from "express";
import createHandler from "./handler/create";
import validationParams from "./validators/create";

const router = Router();

router.get("/", validationParams, createHandler);

export default router;
