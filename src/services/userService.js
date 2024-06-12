import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userDb } from '../config/db.js';

const SECRET_KEY = 'your-secret-key'; 

// Funktion för att registrera en ny användare
async function registerUser(req, res) {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, password: hashedPassword };
    
    const newUser = await userDb.insert(user);
  
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: "Failed to register user" });
  }
}

// Funktion för att registrera en ny administratör
async function registerAdmin(req, res) {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, password: hashedPassword, role: 'admin' };
    
    const newAdmin = await userDb.insert(user);
  
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(400).json({ error: "Failed to register admin" });
  }
}

// Funktion för att logga in en användare
async function loginUser(req, res) {
  const { username, password } = req.body;

  // Kontrollera om användarnamn och lösenord är tillgängliga
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {
    // Hitta användaren i databasen
    const user = await userDb.findOne({ username });

    // Om användaren inte finns eller lösenordet är felaktigt, returnera felmeddelande
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Kontrollera om användaren är administratör
    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // Om allt är korrekt, sätt användaren som den aktuella användaren
    global.currentUser = user;

    // Returnera ett framgångsmeddelande med användarens roll
    res.status(200).json({ message: 'Login successful', role: user.role });
  } catch (error) {
    console.error('Error logging in admin:', error);
    res.status(500).json({ error: 'Failed to login admin' });
  }
}

export { registerUser, registerAdmin, loginUser };
