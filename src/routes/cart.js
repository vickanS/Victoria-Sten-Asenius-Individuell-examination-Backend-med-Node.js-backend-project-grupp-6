import { Router } from "express";
import { viewCart } from "../services/cartService.js";
import authenticate from "../middleware/auth.js";

const cartRouter = Router();

// // "GET"/order/cart Få fram kundvagnen med totalpris på ordern som gäst
cartRouter.get("/", viewCart);

// // "GET"/order/user/cart Få fram kundvagnen med totalpris på ordern som inloggad användare
// orderRouter.get("/user/cart", authenticate, viewCartUser);

export default cartRouter;
