import { Router } from "express";
import { addToCart, removeFromCart } from "../services/cartService.js";
import { validateOrder } from "../middleware/validateOrder.js";
import authenticate from "../middleware/auth.js";

const orderRouter = Router();
// "POST"/order/ - Funktion för att skapa en ny order som gäst
orderRouter.post("/", validateOrder, addToCart);

// "POST"/order/user - Funktion för att skapa en ny order som inloggad användare
orderRouter.post("/user", authenticate, validateOrder, addToCart);

// "DELETE"/order ta bort en order
orderRouter.delete("/:id", removeFromCart);

export default orderRouter;

// "POST"/order Funktion för att skapa en ny order som inloggad användare
// orderRouter.post("/", createOrderUser, validateOrder);
// // "POST"/order Funktion för att skapa en ny order som gäst
// orderRouter.post("/", createOrderGuest, validateOrder);
