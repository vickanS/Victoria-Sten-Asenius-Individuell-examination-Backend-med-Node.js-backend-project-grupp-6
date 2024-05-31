import { Router } from "express";
import { menu } from "../config/data.js";

const router = Router();

// "GET"/menu Visar hela menyn

router.get("/", (req, res) => {
    res.json(menu);
  });
  
  export default router;