import { Router } from "express";
import { menu } from "../config/data.js";
import { addToCart } from "../services/coffee.js";

const router = Router();

// Visar hela menyn
router.get("/", (req, res) => {
  res.json(menu);
});

// POST ny order
router.post("/order", (req, res) => {
  addToCart(req.body);
  res.json({ message: "Order created succssfully" });
});

export default router;
