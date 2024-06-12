import bcrypt from 'bcrypt';
import { userDb } from '../config/db.js';
import express from 'express';
import { authenticate, authorizeAdmin } from '../middleware/auth.js'; // Importera authenticate och authorizeAdmin middleware
import { menuDb } from '../config/db.js';
import { loginUser } from '../services/userService.js';

const router = express.Router();

const SECRET_KEY = 'your-secret-key'; 


// POST /admin/login - Funktion för att logga in en administratör
router.post("/login", async(req, res) => {
    const { username, password } = req.body;

       // Logga värdena av användarnamn och lösenord
       console.log("Received username:", username);
       console.log("Received password:", password);

    // Validera indata
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    try {
      // Hitta användaren i databasen
      const user = await userDb.findOne({ username });

      // Om användaren inte finns eller lösenordet är felaktigt, returnera felmeddelande
      if (!user || !bcrypt.compareSync(password, user.password) || user.role !== 'admin') {
        console.log("Failed to login admin. Invalid username, password, or role.");
        return res.status(400).json({ error: 'Invalid username or password' });
      }

      // Generera JWT-token baserat på användarens ID och roll
      const tokenPayload = { id: user._id, username: user.username, role: user.role };
      const token = jwt.sign(
        tokenPayload,
        SECRET_KEY,
        { expiresIn: '1h' }
      );

      // Returnera token och rollinformation
      res.status(200).json({ message: 'Admin login successful', token });
    } catch (error) {
        console.log("Failed to login admin. Error:", error);
      res.status(500).json({ error: 'Failed to login admin' });
    }
});

// "DELETE" /menu/:id - Ta bort en produkt med ett specifikt ID
router.delete("/:id", authenticate, authorizeAdmin, async (req, res) => {
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
  
  // "PUT" menu/:id - uppdaterar en produkt i menyn
  router.put("/menu/:id", authenticate, authorizeAdmin, async (req, res) => {
    console.log("PUT request received at /menu/:id"); // Log när PUT-förfrågan tas emot
    const { id } = req.params;
    console.log("Request params:", req.params); // Log request parameters
    console.log("Request body:", req.body); // Log request body

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
router.post("/", authenticate, authorizeAdmin, async (req, res) => {
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
        console.log('Product created:', createdProduct); // Logga den skapade produkten
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error('Failed to create new product:', error); // Logga felet
        res.status(500).json({ error: 'Failed to create new product' });
    }
});

export default router;