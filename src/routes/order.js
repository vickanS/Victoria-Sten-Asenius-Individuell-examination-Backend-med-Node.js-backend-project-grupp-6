import { Router } from "express";
import { createOrder, getUserOrders } from "../services/orderService.js";
import { getOrderById } from "../services/statusService.js";
import authenticate from "../middleware/auth.js";

const orderRouter = Router();

<<<<<<< HEAD
<<<<<<< HEAD
// "POST"/order - Skapa en ny order
orderRouter.post("/", createOrder);
=======
// POST anrop för att skapa order
=======
// "POST" /order skapar order
>>>>>>> origin/dev
orderRouter.post("/", authenticate, createOrder);
>>>>>>> origin/dev

// "GET" /order visar alla ordrar och total summa
orderRouter.get("/", authenticate, getUserOrders);

// "GET" /order/:orderId visar status sidan för en specifik order
orderRouter.get("/:orderId", getOrderById);

export default orderRouter;
