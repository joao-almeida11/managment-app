import getHealth from "@api/controllers/health/index.js";
import { Router } from "express";

const router = Router();

router.get("/", getHealth);

export default router;
