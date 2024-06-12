import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your-secret-key';

function authenticateToken(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    // Extrahera användarinformationen från JWT-tokenet
    const { userId, role } = decoded;
    // Sätt användarinformationen, inklusive användarens roll, i req.user
    req.user = { userId, role };
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
}

export { authenticateToken };
