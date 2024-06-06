import bcrypt from "bcrypt";
import { userDb } from "../config/db.js";

// Funktion för att registrera en ny användare
async function registerUser(req, res) {
  const { username, password } = req.body;

  try {
  // Kontrollera att både användarnamn och lösenord finns
    const hashedPassword = await bcrypt.hash(password, 10);
  // Skapa ett nytt användarobjekt med användarnamn och hashat lösenord
    const user = { username, password: hashedPassword };

  // Försök att lägga till den nya användaren i databasen
    const newUser = await userDb.insert(user);
  // Om det lyckas, returnera den nya användaren
    res.status(201).json(newUser);
  } catch (error) {
  // Om ett fel uppstår, returnera ett felmeddelande
    res.status(400).json({ error: "Failed to register user" });
  }
};

// Funktion för att logga in en användare
async function loginUser(req, res) {
  const { username, password } = req.body;

  // Kontrollera att både användarnamn och lösenord finns
  if (!username || !password) {
  // Om något av användarnamn eller lösenord saknas, skicka tillbaka ett felmeddelande med status 400
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }
  try {
  // Sök efter användaren i vår databas för nya användare
    const user = userDb.find(
      (u) => u.username === username && u.password === password
    );

  // Sätt global.currentUser för att indikera att användaren är inloggad
    global.currentUser = user;

  // Skicka tillbaka ett meddelande om att inloggningen var framgångsrik med status 200
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
  // Om ett fel uppstår under inloggningen, skicka tillbaka ett felmeddelande med status 400
    res.status(400).json({ error: "Failed to login user" });
  }
};

export { registerUser, loginUser };
