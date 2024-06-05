import { Router } from 'express';
import { createOrder } from '../services/orderService.js';
import { getOrderById } from '../services/statusService.js';
import authenticate from '../middleware/auth.js';

const orderRouter = Router();

// POST anrop för att skapa order
orderRouter.post('/', authenticate, createOrder);

// "GET" /order/:orderId
orderRouter.get('/:orderId', getOrderById);

export default orderRouter;
