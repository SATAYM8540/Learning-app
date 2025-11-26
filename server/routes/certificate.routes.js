import { Router } from "express";
import {
  getMyCertificates,
  downloadCertificate
} from "../controllers/certificate.controller.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.get("/me", auth("student"), getMyCertificates);
router.get("/:id/download", auth("student"), downloadCertificate);

export default router;
