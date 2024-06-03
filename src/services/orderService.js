import { menu, users, guestOrder, usersOrder } from "../config/data.js";

// "POST"/order/guest - Funktion för att skapa en ny order
async function createOrderGuest(req, res) {
  const { title, price } = req.body;

  const product = menu.find((item) => item.title === title);

  if (!product) {
    return res.status(400).json({ error: "Product not found" });
  }

  if (product.price !== price) {
    return res.status(400).json({ error: "Invalid price" });
  }

  const order = { title, price };
  try {
    const newOrder = await guestOrder.insert(order);
    const response = {
      title: newOrder.title,
      price: newOrder.price,
      message: "Order created successfully",
    };
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: "Failed to create order" });
  }
}

// "POST"/order/user - Funktion för att skapa en ny order för inloggad användare
async function createOrderUser(req, res) {
  const { title, price } = req.body;
  const userId = req.user.id; // Här antar vi att användarens ID finns i req.user efter autentisering

  const product = menu.find((item) => item.title === title);

  if (!product) {
    return res.status(400).json({ error: "Product not found" });
  }

  if (product.price !== price) {
    return res.status(400).json({ error: "Invalid price" });
  }

  const order = { userId, title, price };
  try {
    const newOrder = await usersOrder.insert(order);
    const response = {
      title: newOrder.title,
      price: newOrder.price,
      message: "Order created successfully",
    };
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: "Failed to create order" });
  }
}

// "GET"/order varukorg som gäst
async function viewCartGuest(req, res) {
  try {
    const cart = await guestOrder.find({}).exec();
    const totalPrice = cart.reduce((total, order) => total + order.price, 0);
    res.status(200).json({ cart, totalPrice });
  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve cart" });
  }
};
// "GET"/order varukorg som inloggad användare
async function viewCartUser(req, res) {
  const userId = req.user.id;
  try {
    const cart = await usersOrder.find({}).exec();
    const totalPrice = cart.reduce((total, order) => total + order.price, 0);
    res.status(200).json({ cart, totalPrice });
  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve cart" });
  }
}

// "DELETE"/order Ta bort order
async function deleteOrder(req, res) {
  try {
    const order = await guestOrder.findOne({ _id: req.params.id });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await guestOrder.remove({ _id: req.params.id });

    const user = users.find((u) => u.id === order.userId);
    if (user) {
      user.orders = user.orders.filter((o) => o._id !== req.params.id);
    }

    res.status(200).json({ message: "Order removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
}

export { createOrderGuest, createOrderUser, viewCartGuest, viewCartUser, deleteOrder };