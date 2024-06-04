import { Router } from "express";
import { createOrder } from "../services/orderService.js";
import authenticate from "../middleware/auth.js";

const orderRouter = Router();

// "POST"/order - Skapa en ny order
orderRouter.post("/", createOrder);

export default orderRouter;
