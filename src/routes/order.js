import { Router } from "express";
import { createOrder, orderHistory } from "../services/orderService.js"
import { validateOrder } from "../middleware/validateOrder.js";

const router = Router();

// "POST"/order Funktion för att skapa en ny order
router.post('/', validateOrder, createOrder);
// "GET"/order Få fram orderhistorik
router.get('/', orderHistory);




export default router;
