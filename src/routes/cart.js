import { Router } from "express";
import {
  viewCart,
  addToCart,
  removeFromCart,
} from "../services/cartService.js";
import { validateCart } from "../middleware/validateCart.js";
import authenticate from "../middleware/auth.js";

const cartRouter = Router();

// "POST"/cart - Lägga ett objekt i sin kundvagn
cartRouter.post("/", validateCart, addToCart);

// "POST"/order/user - Funktion för att skapa en ny order som inloggad användare (WIP)
// cartRouter.post("/user", authenticate, validateCart, addToCart);

// "GET"/cart Få fram kundvagnen med totalpris på ordern som gäst
cartRouter.get("/", viewCart);

// "DELETE"/cart ta bort ett objekt från sin kundvagn
cartRouter.delete("/:id", removeFromCart);

// "GET"/cart/user (eller nåt) Få fram kundvagnen med totalpris på ordern som inloggad användare (WIP)
// cartRouter.get("/cart/user", authenticate, viewCartUser);

export default cartRouter;
