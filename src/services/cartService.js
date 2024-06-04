import { cartDb } from "../config/db.js";
import { menu } from "../config/data.js";

// "POST"/cart Funktion för att lägga till i kundvagnen
async function addToCart(req, res) {
  // Hämta 'title' och 'price' från klientens förfrågan (request body)
  const { title, price } = req.body; // req.body används för att fånga upp data som skickas i en POST-begäran till servern.

  // Hitta produkten i menyn baserat på titeln
  const product = menu.find((item) => item.title === title);

  // Om produkten inte finns i menyn, returnera ett felmeddelande
  if (!product) {
    return res.status(400).json({ error: "Product not found" });
  }

  // Om priset inte matchar produktens pris, returnera ett felmeddelande
  if (product.price !== price) {
    return res.status(400).json({ error: "Invalid price" });
  }

  // Skapa en order med titel och pris
  const order = { title, price };
  try {
  // Lägger till kaffet i cart databasen
    const newOrder = await cartDb.insert(order);
  // Skapa ett svar med orderns titel, pris och ett framgångsmeddelande
    const response = {
      title: newOrder.title,
      price: newOrder.price,
      message: "Added to cart successfully",
    };

  // Skicka svaret tillbaka till klienten med statuskod 201 (Created)
    res.status(201).json(response);
  } catch (error) {
  // Om något går fel, skicka ett felmeddelande tillbaka till klienten
    res.status(400).json({ error: "Failed to add to cart" });
  }
};

// "GET"/cart varukorg
async function viewCart(req, res) {
  try {
  // Visar vad du har i "kundvagnen"
    const cart = await cartDb.find({});

  // Räknar ut totalsumman
    const totalPrice = cart.reduce((total, order) => total + order.price, 0);

  // Skickar tillbaka ordern med totalsumman
    res.status(200).json({ cart, totalPrice });
  } catch (error) {
  // Om ett fel uppstår, skicka ett felmeddelande med statuskod 400 till klienten
    res.status(400).json({ error: "Failed to retrieve cart" });
  }
};

// "DELETE"/cart/id Ta bort från kundvagnen
async function removeFromCart(req, res) {
  try {
  // Hitta en specifik order i databasen baserat på order-ID
    const order = await cartDb.findOne({ _id: req.params.id });
  // Om ordern inte finns, returnera ett 404-fel (Not Found) och ett meddelande
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
  // Om ordern finns, ta bort den från databasen
    await cartDb.remove({ _id: req.params.id });
  // Skicka tillbaka ett svar med status 200 (OK) och ett meddelande om att ordern togs bort framgångsrikt
    res.status(200).json({ message: "Order removed successfully" });
  } catch (error) {
  // Om något går fel, skicka tillbaka ett svar med status 500 (Internal Server Error) och ett felmeddelande
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

export { addToCart, viewCart, removeFromCart };
