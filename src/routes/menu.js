import { Router } from "express";
import { menuDb } from "../config/db.js";
import { menu } from "../config/data.js";

const router = Router();

// "GET" /menu - visar hela menyn
router.get("/", async (req, res) => {
  try {
    const dbMenuItems = await menuDb.find(); // Hämta nya produkter från menuDb
    const combinedMenu = [...menu, ...dbMenuItems]; // Kombinera de statiska och nya produkterna
    res.json(combinedMenu);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

// "DELETE" /menu/:id - Ta bort en produkt med ett specifikt ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await menuDb.remove({ _id: id }); // Eller vilken metod din databas använder för att ta bort en produkt
    if (deletedProduct) {
      res.status(200).json({ message: 'Product removed successfully' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove product' });
  }
});

// "PUT" /menu/:id - uppdaterar en produkt i menyn
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, desc, price } = req.body;

  // Kontrollera att alla nödvändiga fält finns med
  if (!title || !desc || !price) {
    return res.status(400).json({ error: 'All fields (title, desc, price) are required' });
  }

  try {
    const products = await menuDb.find({ _id: id });
    const product = products[0]; // Om find returnerar en array, ta första elementet
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Uppdatera produktens fält
    product.title = title;
    product.desc = desc;
    product.price = price;
    product.modifiedAt = new Date().toISOString();

    // Spara den uppdaterade produkten tillbaka till databasen
    const result = await menuDb.update({ _id: id }, product);

    // Kontrollera att uppdateringen lyckades
    if (result) {
      const updatedProduct = await menuDb.find({ _id: id });
      res.status(200).json(updatedProduct);
    } else {
      res.status(500).json({ error: 'Failed to update product' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
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