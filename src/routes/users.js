import express from "express";
const router = express.Router();

// Registrerade användare
const users = [
  {
    id: 1,
    username: 'JofAlm',
    password: '123456', 
    orders: []
  },
  {
    id: 2,
    username: 'LinneaSjoholm',
    password: 'abcdef',
    orders: []
  },
  {
    id: 3,
    username: 'Pesilian',
    password: '789101', 
    orders: []
  },
  {
    id: 4,
    username: 'patrikeriksson',
    password: 'ghijkl', 
    orders: []
  },
  {
    id: 5,
    username: 'vickanS',
    password: '121314', 
    orders: []
  },
];

// GET-endpoint för att returnera alla användare
router.get('/all', (req, res) => {
  res.status(200).json(users);
});

// POST-endpoint för att registrera en ny användare
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const newUser = {
    id: users.length + 1,
    username,
    password,
    orders: []
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// POST-endpoint för att hantera inloggning av användare
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log("Inkommande data:", req.body); // Logga inkommande data
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    console.log("Användare hittades:", user);
    res.status(200).json({ message: "Inloggad", user });
  } else {
    console.log("Användare hittades inte");
    res.status(401).json({ message: "Fel användarnamn eller lösenord" });
  }
});

export default router;