import jwt from 'jsonwebtoken';
import { userDb } from '../config/db.js';

// Middleware för att autentisera användare
export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header is missing' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token is missing' });
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret_key');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

// Exempel på auktoriseringsfunktion för att kontrollera om användaren är admin
export const authorizeUser = (req, res, next) => {
  // Här kan du implementera din logik för att kontrollera om användaren är auktoriserad
  // Till exempel, om användaren är admin:
  if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
  }
  // Om auktoriserad, gå vidare till nästa middleware eller route handler
  next();
};

// Middleware för att auktorisera admin
export const authorizeAdmin = async (req, res, next) => {
    try {
        const users = await userDb.find({ _id: req.user.id });
        const user = users[0];

        if (!user || user.role !== 'admin') {
            return res.status(403).json({ error: 'Forbidden: Requires admin role' });
        }

        next();
    } catch (error) {
        return res.status(500).json({ error: 'Failed to authorize' });
    }
};

// Middleware för att logga ut admin
export const logoutAdmin = (req, res) => {
    res.status(200).json({ message: 'Logged out successfully' });
};




