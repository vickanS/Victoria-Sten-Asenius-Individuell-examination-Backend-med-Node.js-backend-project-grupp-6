import { Router } from "express";
import { menu } from "../config/data.js";
// import { addToCart } from "../services/coffee.js";
import { createOrder } from "../services/orderService.js";

const router = Router();

// "GET" Visar hela menyn
router.get("/", (req, res) => {
  res.json(menu);
});

// "POST" Skapa ny order
router.post("/", createOrder);

// "DELTE" Ta bort order

// POST ny order
// router.post("/order", (req, res) => {
//   addToCart(req.body);
//   res.json({ message: "Order created succssfully" });
// });



export default router;
