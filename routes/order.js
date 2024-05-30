import { Router } from "express";
import { menu } from "../config/data.js"
import { createOrder, orderHistory } from "../services/orderService.js";
// import { addToCart } from "../services/coffee.js";

const router = Router();


// "GET" Visa orderhistorik
router.get("/orders/:id", orderHistory)


// "POST" Skapa ny order
router.post("/", createOrder);

// "DELTE" Ta bort order
  
// POST ny order
// router.post("/order", (req, res) => {
//   addToCart(req.body);
//   res.json({ message: "Order created succssfully" });
// });



export default router;
