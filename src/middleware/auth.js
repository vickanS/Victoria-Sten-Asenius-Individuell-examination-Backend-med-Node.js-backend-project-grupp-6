const authenticate = (req, res, next) => {
  if (global.currentUser) {
    req.user = global.currentUser;
  }

  next();

};

const authorizeAdmin = (req, res, next) => {
  // Kontrollera om användaren är autentiserad och är administratör
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  next();

};

export { authenticate, authorizeAdmin };
