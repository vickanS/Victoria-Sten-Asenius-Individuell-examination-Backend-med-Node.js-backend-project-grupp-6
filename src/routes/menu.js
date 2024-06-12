import { Router } from "express";
import { menuDb } from "../config/db.js";
import { menu } from "../config/data.js";
import { authenticate, authorizeAdmin } from "../middleware/auth.js";

const router = Router();

// "GET" /menu - visar hela menyn
router.get("/", async (req, res) => {
  try {
    const dbMenuItems = await menuDb.find(); // Hämta nya produkter från menuDb
    const combinedMenu = [...menu, ...dbMenuItems]; // Kombinera de statiska och nya produkterna
    res.json(combinedMenu);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});


  
  export default router;