import { Router } from "express";
import {
  createQuiz,
  getQuizByCourse
} from "../controllers/quiz.controller.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.get("/course/:courseId", auth(), getQuizByCourse);
router.post("/", auth(["admin", "supervisor"]), createQuiz);

export default router;
