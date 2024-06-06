import { Router } from "express";
import { createOrder, getUserOrders } from "../services/orderService.js";
import { getOrderById } from "../services/statusService.js";
import authenticate from "../middleware/auth.js";

const orderRouter = Router();

orderRouter.post("/", authenticate, createOrder);

// "GET" /order visar alla ordrar och total summa
orderRouter.get("/", authenticate, getUserOrders);

// "GET" /order/:orderId visar status sidan för en specifik order
orderRouter.get("/:orderId", getOrderById);

export default orderRouter;
