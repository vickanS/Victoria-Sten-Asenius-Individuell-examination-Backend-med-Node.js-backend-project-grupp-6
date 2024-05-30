import nedb from "nedb-promises";
import { menu } from "../config/data.js";

const database = new nedb({ filename: "orders.db", autoload: true });

// Funktion för att skapa en ny order
async function createOrder(req, res) {
  // Hämta 'title' och 'price' från klientens förfrågan (request body)
  const { title, price } = req.body; // req.body används för att fånga upp data som skickas i en POST-begäran till servern.

  // Hitta produkten i menyn baserat på titeln
  const product = menu.find((item) => item.title === title);

  // Om produkten inte finns i menyn, returnera ett felmeddelande
  if (!product) {
    return res.status(400).json({ error: "Invalid product" });
  }

  // Om priset inte matchar produktens pris, returnera ett felmeddelande
  if (product.price !== price) {
    return res.status(400).json({ error: "Invalid price" });
  }

  // Skapa en order med titel och pris
  const order = { title, price };

  try {
    // Infogar ordern i databasen
    const newOrder = await database.insert(order);

    // Skapa ett svar med orderns titel, pris och ett framgångsmeddelande
    const response = {
      title: newOrder.title,
      price: newOrder.price,
      message: "Order created successfully",
    };

    // Skicka svaret tillbaka till klienten med statuskod 201 (Created)
    res.status(201).json(response);
  } catch (error) {
    // Om något går fel, skicka ett felmeddelande tillbaka till klienten
    res.status(400).json({ error: "Failed to create order" });
  }
}
          
export { createOrder };

// async function addToCart(order) {
//   try {
//     const newOrder = await database.insert(order);
//     console.log(newOrder);
//   } catch (error) {
//     console.log(error);
//   }
// }

// Få fram orderhistorik

// Ta bort order

// export { addToCart };
