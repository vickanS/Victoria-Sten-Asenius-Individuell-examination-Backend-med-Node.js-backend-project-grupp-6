import { Router } from "express";
import { createOrder } from "../services/orderService.js";
import authenticate from "../middleware/auth.js";

const orderRouter = Router();

<<<<<<< HEAD
// "POST"/order - Skapa en ny order
orderRouter.post("/", createOrder);
=======
// POST anrop för att skapa order
orderRouter.post("/", authenticate, createOrder);
>>>>>>> origin/dev

export default orderRouter;
