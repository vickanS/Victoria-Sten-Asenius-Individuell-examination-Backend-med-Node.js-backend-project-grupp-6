import { Router } from "express";
import { menuDb } from "../config/data.js";

const router = Router();

// "GET" /menu - Visar hela menyn
router.get("/", (req, res) => {
  res.json(menu);
});

  // "POST" /menu - Lägg till en ny produkt
  router.post("/", async (req, res) => {
    const { id, title, desc, price } = req.body;

    // Kontrollera att alla nödvändiga egenskaper finns med
    if (!id || !title || !desc || !price) {
        return res.status(400).json({ error: 'All properties (id, title, desc, price) are required' });
    }

  // Skapa en ny produkt med createdAt
  const newProduct = {
      id,
      title,
      desc,
      price,
      createdAt: new Date().toISOString()
  };

  try {
    // Spara den nya produkten till databasen
    const createdProduct = await menuDb.insert(newProduct);
    res.status(201).json(createdProduct);
} catch (error) {
    res.status(500).json({ error: 'Failed to create new product' });
}
});
  
  export default router;