import { cartDb, orderDb } from '../config/db.js';

//Beställning som gäst
async function createguestOrder(req, res) {
  try {
    const cart = await cartDb.find({});
    if (cart.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const totalPrice = cart.reduce((total, order) => total + order.price, 0);

    const orderTime = new Date();
    const maxPreparationTime = Math.max(...cart.map(order => order.preptime));



    const deliveryTime = new Date(
      orderTime.getTime() + maxPreparationTime * 60000
    );


    const order = {
      items: cart,
      totalPrice,
      deliveryTime,
      createdAt: new Date(),
    };

    await orderDb.insert(order);

    await cartDb.remove({}, { multi: true });

    res.status(201).json({
      items: order.items,
      totalPrice: order.totalPrice,
      delivery: order.deliveryTime,
      message: 'Order created successfully',
      orderId: order._id,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to create order', error: error.message });
  }
}

//Beställning som inloggad användare:
async function createOrder(req, res) {
  try {
    const cart = await cartDb.find({});
    if (cart.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const totalPrice = cart.reduce((total, order) => total + order.price, 0);

    const orderTime = new Date();
    const maxPreparationTime = Math.max(...cart.map(order => order.preptime));



    const deliveryTime = new Date(
      orderTime.getTime() + maxPreparationTime * 60000
    );


    const user = req.user;
    const order = {
      items: cart,
      totalPrice,
      deliveryTime,
      createdAt: new Date(),
      userId: user.id, // Inkluderar userId om användaren är inloggad
    };


    const newOrder = await orderDb.insert(order);


    await cartDb.remove({}, { multi: true });

    res.status(201).json({

      items: newOrder.items,
      totalPrice: newOrder.totalPrice,
      delivery: newOrder.deliveryTime,
      message: 'Order created successfully',
      orderId: newOrder._id, // Inkluderar orderId om användaren är inloggad

    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to create order', error: error.message });
  }
}


// Funktion för att hämta en användares orderhistorik
async function getUserOrders(req, res) {
  try {
    const userId = req.params.userId;

    const usersOrder = await orderDb.find({ userId: userId });

    if (usersOrder.length === 0) {
      return res.status(404).json({ error: 'No orders found' });
    }

    res.status(200).json({ orderCount: usersOrder.length, orders: usersOrder });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get users orders' });
  }
}


export { createOrder, getUserOrders, createguestOrder };

