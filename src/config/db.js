import nedb from "nedb-promises";

// Skapa en databas för varukorgen
const cartDb = new nedb({ filename: "cart.db", autoload: true });
// Skapa en databas för ordrar
const orderDb = new nedb({ filename: "orders.db", autoload: true });
// Skapa en databas för användare
const userDb = new nedb({ filename: "users.db", autoload: true });

export { cartDb, orderDb, userDb };
