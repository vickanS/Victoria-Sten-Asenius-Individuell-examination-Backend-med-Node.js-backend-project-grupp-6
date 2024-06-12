import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userDb } from '../config/db.js'; // Anta att du har en userDb för användardata

const SECRET_KEY = 'your-secret-key'; 

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

    // Anta att användarens roll finns tillgänglig i user.role
    const tokenPayload = { id: user._id, username: user.username, role: user.role };

    const token = jwt.sign(
      tokenPayload,
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login user' });
  }
}

export { loginUser };
