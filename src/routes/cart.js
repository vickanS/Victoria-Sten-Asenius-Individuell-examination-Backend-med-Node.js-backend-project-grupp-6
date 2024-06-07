import { Router } from 'express';
import {
  viewCart,
  addToCart,
  removeFromCart,
} from '../services/cartService.js';
import { validateCart } from '../middleware/validateCart.js';

const cartRouter = Router();

// "POST"/cart - Lägga ett objekt i sin kundvagn
cartRouter.post('/', validateCart, addToCart);

// // "GET"/cart Få fram kundvagnen med totalpris på ordern som gäst
cartRouter.get('/', viewCart);

// "DELETE"/cart ta bort ett objekt från sin kundvagn
cartRouter.delete('/:id', removeFromCart);

export default cartRouter;
