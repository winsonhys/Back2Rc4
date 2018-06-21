import { Router } from "express";
import createHandler from "./handler/create";

const router = Router();

router.get("/", createHandler);

export default router;
