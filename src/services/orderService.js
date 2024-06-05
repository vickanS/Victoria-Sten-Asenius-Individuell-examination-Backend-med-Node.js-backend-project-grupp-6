import { cartDb, orderDb } from "../config/db.js";

// Funktion för att skapa en ny order
async function createOrder(req, res) {
  try {
  // Hämta alla objekt i kundvagnen från databasen
    const cart = await cartDb.find({});
  // Om kundvagnen är tom, returnera ett svar med status 400 (Bad Request) och ett meddelande
    if (cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
  // Beräkna det totala priset för alla objekt i kundvagnen
    const totalPrice = cart.reduce((total, order) => total + order.price, 0);
<<<<<<< HEAD
  // Skapa en ny order med objekten från kundvagnen, totala priset och det aktuella datumet
    const order = { items: cart, totalPrice, createdAt: new Date() };
  // Spara den nya ordern i order-databasen
    const newOrder = await orderDb.insert(order);
  // Ta bort alla objekt från kundvagnen
=======

    const order = { items: cart, totalPrice, createdAt: new Date() };

    // Kolla om användarn är inloggad
    const user = req.user;
    if (user) {
      // Om användarn är inloggad, lägg till användar info till ordern och spara till orderhistoriken
      order.userId = user.id;
      await orderDb.insert(order);
    }

    // Tömmer kundvagnen efter ordern är skapad
>>>>>>> origin/dev
    await cartDb.remove({}, { multi: true });
  // Skicka tillbaka ett svar med status 201 (Created) och information om den nya ordern
    res.status(201).json({
      items: order.items,
      totalPrice: order.totalPrice,
      message: "Order created successfully",
      ...(user && { orderId: order._id }), // Inkluderar orderId om användaren är inloggad
    });
  } catch (error) {
  // Om något går fel, skicka tillbaka ett svar med status 500 (Internal Server Error) och ett felmeddelande
    res
      .status(500)
      .json({ message: "Failed to create order", error: error.message });
  }
};

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
