
// Middleware som kontrollerar om användaren är inloggad
const authenticate = (req, res, next) => {
  // Kontrollera om det finns en global variabel currentUser som är satt (dvs. användaren är inloggad)
  if (global.currentUser) {
    req.user = global.currentUser;
  }
  next();
};

export default authenticate;
