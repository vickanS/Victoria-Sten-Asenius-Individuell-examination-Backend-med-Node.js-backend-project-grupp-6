import { Router } from "express";
import { createOrder, orderHistory } from "../services/orderService.js"

const router = Router();

// "POST"/order Funktion för att skapa en ny order
router.post('/', createOrder);
// "GET"/order Få fram orderhistorik
router.get('/', orderHistory);




export default router;
