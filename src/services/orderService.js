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
  // Skapa en ny order med objekten från kundvagnen, totala priset och det aktuella datumet
    const order = { items: cart, totalPrice, createdAt: new Date() };
  // Spara den nya ordern i order-databasen
    const newOrder = await orderDb.insert(order);
  // Ta bort alla objekt från kundvagnen
    await cartDb.remove({}, { multi: true });
  // Skicka tillbaka ett svar med status 201 (Created) och information om den nya ordern
    res.status(201).json({
      orderId: newOrder._id,
      items: newOrder.items,
      totalPrice: newOrder.totalPrice,
      message: "Order created successfully",
    });
  } catch (error) {
  // Om något går fel, skicka tillbaka ett svar med status 500 (Internal Server Error) och ett felmeddelande
    res
      .status(500)
      .json({ message: "Failed to create order", error: error.message });
  }
};

export { createOrder };
