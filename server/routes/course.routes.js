import { Router } from "express";
import {
  getCourses,
  getCourseById,
  enrollInCourse,
  getMyEnrollments,
  createCourse,
  updateCourse,
  deleteCourse
} from "../controllers/course.controller.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.get("/", getCourses);
router.get("/:id", getCourseById);

router.post("/:id/enroll", auth("student"), enrollInCourse);
router.get("/me/enrollments/list", auth("student"), getMyEnrollments);

// admin
router.post("/", auth(["admin", "supervisor"]), createCourse);
router.put("/:id", auth(["admin", "supervisor"]), updateCourse);
router.delete("/:id", auth(["admin", "supervisor"]), deleteCourse);

export default router;
