import { Router } from "express";
import { companyInfo } from "../config/data.js";

const router = Router();

// Visar information om företaget
router.get("/", (req, res) => {
  res.json(companyInfo);
});

export default router;
