import { Router } from "express";
import { createOrder } from "../services/orderService.js";
import authenticate from "../middleware/auth.js";

const orderRouter = Router();

orderRouter.post("/", createOrder);

export default orderRouter;
