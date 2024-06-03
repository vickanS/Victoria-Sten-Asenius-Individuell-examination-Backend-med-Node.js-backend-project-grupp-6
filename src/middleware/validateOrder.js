// Middleware för att validera en order
function validateOrder(req, res, next) {
  // Destrukturera title och price från req.body
  const { title, price, userId } = req.body;
  // Kontrollera om title eller price saknas
  if (!title || !price || !userId) {
    // Om någon av dem saknas, skicka en 400-status och ett felmeddelande
    return res.status(400).json({ error: "Title and price are required" });
  }
  // Om båda title och price finns, gå vidare till nästa middleware eller route handler
  next();
}

export { validateOrder };
