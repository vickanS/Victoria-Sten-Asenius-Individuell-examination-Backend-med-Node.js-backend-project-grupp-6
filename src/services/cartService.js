import { cartDb } from '../config/db.js';
import { menu } from '../config/data.js';

// "POST"/cart Funktion för att lägga till i kundvagnen
async function addToCart(req, res) {
  const { title, price } = req.body; 

  const product = menu.find(item => item.title === title);

  if (!product) {
    return res.status(400).json({ error: 'Product not found' });
  }

  if (product.price !== price) {
    return res.status(400).json({ error: 'Invalid price' });
  }

  const order = { title, price, preptime: product.preptime };
  try {
    const newOrder = await cartDb.insert(order);


    const response = {
      title: newOrder.title,
      price: newOrder.price,
      preptime: newOrder.preptime,
      message: 'Added to cart successfully',
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add to cart' });
  }
}

// "GET"/cart varukorg
async function viewCart(req, res) {
  try {
    const cart = await cartDb.find({});

    const totalPrice = cart.reduce((total, order) => total + order.price, 0);

    res.status(200).json({ cart, totalPrice });
  } catch (error) {
    res.status(400).json({ error: 'Failed to retrieve cart' });
  }
}

// "DELETE"/cart/id Ta bort från kundvagnen
async function removeFromCart(req, res) {
  try {
    const order = await cartDb.findOne({ _id: req.params.id });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await cartDb.remove({ _id: req.params.id });

    res.status(200).json({ message: 'Order removed successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'An error occurred', error: error.message });
  }
}

export { addToCart, viewCart, removeFromCart };
