
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userDb } from '../config/db.js'; // Anta att du har en userDb för användardata


// Funktion för att registrera en ny användare
async function registerUser(req, res) {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, password: hashedPassword };

    // Försök att lägga till den nya användaren i databasen
    const newUser = await userDb.insert(user);
    // Om det lyckas, returnera den nya användaren
    res.status(201).json(newUser);
  } catch (error) {
    // Om ett fel uppstår, returnera ett felmeddelande
    res.status(400).json({ error: "Failed to register user" });
  }
}


const SECRET_KEY = 'your-secret-key'; // Du bör använda en miljövariabel för detta


async function loginUser(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }


  try {
    const user = await userDb.findOne({ username });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login user' });

  }
}

export { registerUser, loginUser };
