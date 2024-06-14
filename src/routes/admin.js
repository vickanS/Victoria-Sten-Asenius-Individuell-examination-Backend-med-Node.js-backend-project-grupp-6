import express from 'express';
import { menuDb, userDb } from '../config/db.js';
import { authenticate, authorizeAdmin, authorizeUser, logoutAdmin } from '../middleware/auth.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validateCampaign } from '../middleware/validateCampaign.js';
import { addCampaign } from '../services/campaignService.js';

const router = express.Router();

// POST /admin/create-user - Funktion för att skapa en administratörsanvändare
router.post('/create-user', async (req, res) => {
    const { username, password, email, phone } = req.body;

    if (!username || !password || !email || !phone) {
        return res.status(400).json({ error: 'All fields (username, password, email, phone) are required' });
    }

    // Generera en bcrypt-hash av lösenordet
    const hashedPassword = bcrypt.hashSync(password, 10); // 10 är antalet hashrundor

    try {
        // Skapa eller uppdatera användaren med hashat lösenord
        const user = await userDb.update(
            { username },
            { username, password: hashedPassword, email, phone, role: 'admin' },
            { upsert: true }
        );
        console.log('User created or updated:', user);
        res.status(201).json({ message: 'User created or updated', user });
    } catch (error) {
        console.error('Failed to create or update user:', error);
        res.status(500).json({ error: 'Failed to create or update user' });
    }
});

// POST /admin/login - Logga in en administratör
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Both username and password are required' });
    }

    try {
        const users = await userDb.find({ username });
        const user = users[0];

        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, 'your_jwt_secret_key', { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Failed to login:', error);
        res.status(500).json({ error: 'Failed to login' });
    }
});


// DELETE /menu/:id - Ta bort en produkt med ett specifikt ID
router.delete("/menu/:id", authenticate, authorizeAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await menuDb.remove({ _id: id });
        if (deletedProduct) {
            res.status(200).json({ message: 'Product removed successfully' });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove product' });
    }
});

// PUT /menu/:id - uppdaterar en produkt i menyn
router.put("/menu/:id", authenticate, authorizeAdmin, async (req, res) => {
    console.log("PUT request received at /menu/:id");
    const { id } = req.params;
    console.log("Request params:", req.params);
    console.log("Request body:", req.body);

    const { title, desc, price } = req.body;

    if (!title || !desc || !price) {
        return res.status(400).json({ error: 'All fields (title, desc, price) are required' });
    }

    try {
        const products = await menuDb.find({ _id: id });
        const product = products[0];
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        product.title = title;
        product.desc = desc;
        product.price = price;
        product.modifiedAt = new Date().toISOString();

        const result = await menuDb.update({ _id: id }, product);

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

// POST /admin/menu - Lägg till en ny produkt i menyn
router.post('/menu', authenticate, authorizeAdmin, authorizeUser, async (req, res) => {
    console.log('POST request received at /admin/menu');
    console.log('Request body:', req.body);

    const { id, title, desc, price } = req.body;

    if (!id || !title || !desc || !price) {
        console.error('Validation error: Missing required fields');
        return res.status(400).json({ error: 'All properties (id, title, desc, price) are required' });
    }

    const newProduct = {
        id,
        title,
        desc,
        price,
        createdAt: new Date().toISOString()
    };

    try {
        const createdProduct = await menuDb.insert(newProduct);
        console.log('Product created:', createdProduct);
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error('Failed to create new product:', error);
        res.status(500).json({ error: 'Failed to create new product' });
    }
});

// POST /admin/logout - Funktion för att logga ut en administratör
router.post('/logout', logoutAdmin);

router.post('/campaign', authenticate, authorizeAdmin, validateCampaign, addCampaign )

export default router;

