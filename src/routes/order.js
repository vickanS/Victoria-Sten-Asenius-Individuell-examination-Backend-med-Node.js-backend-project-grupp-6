import { Router } from "express";
import { createOrder } from "../services/orderService.js";
import authenticate from "../middleware/auth.js";

const orderRouter = Router();

// POST anrop för att skapa order
orderRouter.post("/", authenticate, createOrder);

export default orderRouter;
