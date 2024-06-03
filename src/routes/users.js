import { Router } from "express";
import { registerUser, loginUser } from "../services/userService.js";
import { validateUser } from "../middleware/validateUser.js";

const router = Router();

router.post("/register", validateUser, registerUser);
router.post("/login", loginUser);

// Ny endpoint för att hämta orderhistorik för en specifik användare
// router.get("/orders", (req, res) => {
//   if (user) {
//     res.status(200).json(user.orders);
//   } else {
//     res.status(404).json({ message: "User not found" });
//   }
// });

export default router;
