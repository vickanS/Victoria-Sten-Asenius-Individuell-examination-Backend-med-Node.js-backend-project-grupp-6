import { orderDb } from "../config/db.js";

//Hämta orderinfo om specifik order
async function getOrderById(req, res) {
  try {
   
    const orderId = req.params.orderId;

    const order = await orderDb.findOne({ _id: orderId });

    const currentTime = new Date();
    const deliveryTime = new Date(order.deliveryTime);
    const isDelivered = deliveryTime <= currentTime;

    let timeLeft = null;
    if (!isDelivered) {
      const timeDiff = deliveryTime - currentTime;
      const minutesLeft = Math.floor(timeDiff / 60000);

      const secondsLeft = Math.floor((timeDiff % 60000) / 1000);
      timeLeft = `${minutesLeft} minutes and ${secondsLeft} seconds`;
    }

    const orderWithDeliveryStatus = {
      ...order,
      isDelivered,
      timeLeft: isDelivered ? null : timeLeft,
    };

    res.status(200).json({ orderWithDeliveryStatus });
  } catch (error) {

    res.status(400).json({ error: 'Failed to get users orders' });

  }
}

export { getOrderById };
