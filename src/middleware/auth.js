import bcrypt from 'bcrypt';
import { userDb } from '../config/db.js';

let currentAdmin = null; // Global variabel för att spåra inloggad admin

// Middleware för autentisering av användare
const authenticate = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        // Hämta användare från databasen
        const user = await userDb.findOne({ username });

        // Om användaren inte finns eller om lösenordet inte matchar
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Om lösenordet är korrekt
        req.user = user;
        next(); // Gå vidare till nästa middleware eller route handler
    } catch (error) {
        console.error('Failed to authenticate:', error.message);
        return res.status(500).json({ error: 'Failed to authenticate' });
    }
};

// Middleware för att auktorisera både admin och användare
const authorizeUser = (req, res, next) => {
    if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'user')) {
        return res.status(403).json({ error: 'Forbidden' });
    }
    next();
};

// Middleware för att auktorisera endast admin
const authorizeAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' });
    }
    next();
};

// Middleware för att logga ut en admin
const logoutAdmin = (req, res, next) => {
    currentAdmin = null; // Implementera här hur du vill logga ut admin
    res.status(200).json({ message: 'Logged out successfully' });
};

export { authenticate, authorizeUser, authorizeAdmin, logoutAdmin };



