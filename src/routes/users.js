import { Router } from "express";
import { users } from "../config/data.js";

const router = Router();

// GET-endpoint för att returnera alla användare
router.get("/all", (req, res) => {
  res.status(200).json(users);
});

// POST-endpoint för att registrera en ny användare
router.post("/register", (req, res) => {
  const { username, password } = req.body;
  const newUser = {
    id: users.length + 1,
    username,
    password,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// POST-endpoint för att hantera inloggning av användare
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log("Incoming data:", req.body); // Logga inkommande data
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    console.log("User found:", user);
    res.status(200).json({ message: "Logged in:", user });
  } else {
    console.log("User not found");
    res.status(401).json({ message: "invalid username or password!" });
  }
});

// Ny endpoint för att hämta orderhistorik för en specifik användare
router.get("/:userId/orders", (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const user = users.find((u) => u.id === userId);
  if (user) {
    res.status(200).json(user.orders);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

export default router;
