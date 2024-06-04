import { cartDb, orderDb } from "../config/db.js";

async function createOrder(req, res) {
  try {
    const cart = await cartDb.find({});
    if (cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalPrice = cart.reduce((total, order) => total + order.price, 0);
    const order = { items: cart, totalPrice, createdAt: new Date() };
    const newOrder = await orderDb.insert(order);

    await cartDb.remove({}, { multi: true });

    res.status(201).json({
      orderId: newOrder._id,
      items: newOrder.items,
      totalPrice: newOrder.totalPrice,
      message: "Order created successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create order", error: error.message });
  }
}

export { createOrder };
