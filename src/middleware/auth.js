
// Middleware som kontrollerar om användaren är inloggad
const authenticate = (req, res, next) => {
  // Kontrollera om det finns en global variabel currentUser som är satt (dvs. användaren är inloggad)
  if (global.currentUser) {
<<<<<<< HEAD
  // Om användaren är inloggad, gå vidare till nästa middleware eller route handler
    next();
  } else {
  // Om användaren inte är inloggad, skicka tillbaka ett svar med status 401 (Unauthorized) och ett meddelande
    res.status(401).json({
      success: false,
      message: "You have to be logged in to view your order history",
      status: 401,
    });
=======
    req.user = global.currentUser;
>>>>>>> origin/dev
  }
  next();
};

export default authenticate;
