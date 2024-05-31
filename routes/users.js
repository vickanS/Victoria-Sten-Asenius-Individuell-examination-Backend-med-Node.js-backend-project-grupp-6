import express from "express";
const router = express.Router();

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

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.status(200).json({ message: "Inloggad", user });
  } else {
    res.status(401).json({ message: "Fel användarnamn eller lösenord" });
  }
});

export default router;