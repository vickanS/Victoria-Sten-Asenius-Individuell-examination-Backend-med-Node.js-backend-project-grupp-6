import { Router } from 'express';

import {
  createOrder,
  createguestOrder,
  getUserOrders,
} from '../services/orderService.js';

import { getOrderById } from '../services/statusService.js';
import { authenticateToken } from '../middleware/authToken.js';

const orderRouter = Router();

// "POST" /order genomför beställning

orderRouter.post('/', authenticateToken, createOrder);

//Post /order/guest
orderRouter.post('/guest', createguestOrder);


// "GET" /order visar alla ordrar och total summa
orderRouter.get('/user/:userId', getUserOrders);

// "GET" /order/:orderId visar status sidan för en specifik order
orderRouter.get('/:orderId', getOrderById);

export default orderRouter;
