import { cartDb, orderDb } from "../config/db.js";

async function createOrder(req, res) {
  try {
    const cart = await cartDb.find({});
    if (cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalPrice = cart.reduce((total, order) => total + order.price, 0);

    const order = { items: cart, totalPrice, createdAt: new Date() };

    // Kolla om användarn är inloggad
    const user = req.user;
    if (user) {
      // Om användarn är inloggad, lägg till användar info till ordern och spara till orderhistoriken
      order.userId = user.id;
      await orderDb.insert(order);
    }

    // Tömmer kundvagnen efter ordern är skapad
    await cartDb.remove({}, { multi: true });

    res.status(201).json({
      items: order.items,
      totalPrice: order.totalPrice,
      message: "Order created successfully",
      ...(user && { orderId: order._id }), // Inkluderar orderId om användaren är inloggad
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create order", error: error.message });
  }
}

// Tror den här måste göras om
// Funktion för att hämta en användares orderhistorik
// async function getUserOrders(req, res) {
//   try {
//     // Hämta användarens ID från request params
//     const userId = req.params.userId;
//     // Använd findOne för att hämta en enskild orderhistorik baserat på användarens ID
//     const usersOrder = await orders.findOne({ userId });

//     // Om det inte finns någon orderhistorik för den angivna användaren, skicka tillbaka ett felmeddelande med status 404
//     if (usersOrder.length === 0) {
//       return res.status(404).json({ error: "No orders found" });
//     }

//     // Skicka tillbaka användarens orderhistorik med status 200
//     res.status(200).json(usersOrder);
//   } catch (error) {
//     // Om ett fel uppstår vid hämtning av användarens orderhistorik, skicka tillbaka ett felmeddelande med status 400
//     res.status(400).json({ error: "Failed to get users orders" });
//   }
// }

export { createOrder };
