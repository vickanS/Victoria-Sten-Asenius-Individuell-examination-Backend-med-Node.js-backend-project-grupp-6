import nedb from "nedb-promises";
// import { menu } from "../config/data.js";

const database = new nedb({ filname: "orders.db", autoload: true });

// Lägg till kaffesort i varukorgen

// async function createOrder(req, res) {
//   const { title, price } = req.product;

//   const order = { title, price };

//   try {
//     const newOrder = await database.insert(order);

//     const response = {
//       title: newOrder.title,
//       price: newOrder.title,
//       message: "Order created successfully",
//     };

//     res.status(201).json(response);
//   } catch (error) {
//     res.status(400).json({ error: "Failed to create order" });
//   }
// }

async function addToCart(order) {
  try {
    const newOrder = await database.insert(order);
    console.log(newOrder);
  } catch (error) {
    console.log(error);
  }
}

// Få fram orderhistorik

// Ta bort order

// export { createOrder };
export { addToCart };
