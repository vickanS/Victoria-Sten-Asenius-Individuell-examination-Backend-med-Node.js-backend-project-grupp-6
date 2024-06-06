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

    //Beräkna leveranstid
    const orderTime = new Date();
    const totalPreparationTime = cart.reduce(
      (total, order) => total + order.preptime,
      0
    );

    console.log(totalPreparationTime);

    const deliveryTime = new Date(
      orderTime.getTime() + totalPreparationTime * 60000
    );

    console.log(orderTime, deliveryTime);

    const order = {
      items: cart,
      totalPrice,
      deliveryTime,
      createdAt: new Date(),
    };

    // Kolla om användaren är inloggad
    const user = req.user;
    if (user) {
      // Om användaren är inloggad, lägg till användar info till ordern och spara till orderhistoriken
      order.userId = user.id;
      await orderDb.insert(order);
    }

    // Tömmer kundvagnen efter ordern är skapad
    await cartDb.remove({}, { multi: true });
  // Skicka tillbaka ett svar med status 201 (Created) och information om den nya ordern
    res.status(201).json({
      items: order.items,
      totalPrice: order.totalPrice,
      delivery: order.deliveryTime,
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

// JENS, VILL DU GÖRA DEN HÄR TACK (getUserOrders funktionen)
// Den ska visa alla ordrar och en totalsumma för alla ordrar
// Typ som GET-requesten på att visa allt i kundvagnen
// Ska bara gå att se om man är inloggad (det är ju bara då man har några ordrar att visa)

// Funktion för att hämta en användares orderhistorik
async function getUserOrders(req, res) {}

export { createOrder, getUserOrders };
