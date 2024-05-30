import { Router } from "express";
import { menu } from "../config/data.js";

const router = Router();

// Visar hela menyn
router.get("/menu", (req, res) => {
  res.json(menu);
});

export default router;
