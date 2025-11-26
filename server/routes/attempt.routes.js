import { Router } from "express";
import {
  submitAttempt,
  getMyAttempts
} from "../controllers/attempt.controller.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/submit", auth("student"), submitAttempt);
router.get("/me", auth("student"), getMyAttempts);

export default router;
