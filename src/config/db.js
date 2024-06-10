import nedb from 'nedb-promises';

const menuDb = new nedb({ filename: 'menu.db', autoload: true });
const cartDb = new nedb({ filename: 'cart.db', autoload: true });
const orderDb = new nedb({ filename: 'orders.db', autoload: true });
const userDb = new nedb({ filename: 'users.db', autoload: true });

export { menuDb, cartDb, orderDb, userDb };
