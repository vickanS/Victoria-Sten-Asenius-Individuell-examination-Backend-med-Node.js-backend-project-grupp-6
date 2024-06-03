
import nedb from "nedb-promises";

const database = new nedb({ filename: "users.db", autoload: true });

// Funktion för att registrera en ny användare

async function registerUser(req, res) {
    const { username, password } = req.body;
    const user = { username, password };

    try {
        // Försök att lägga till den nya användaren i databasen
        const newUser = await database.insert(user);
        // Om det lyckas, returnera den nya användaren
        res.status(201).json(newUser);
    } catch (error) {
        // Om ett fel uppstår, returnera ett felmeddelande
        res.status(400).json({ error: "Failed to register user" });
    }
};

async function loginUser(req, res) {
    const { username, password } = req.body;

    // Kontrollera att både username och password finns
    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    // Hitta användaren i databasen baserat på username
    const user = await database.findOne({ username });

    // Om användaren inte finns eller om lösenordet inte matchar, returnera ett felmeddelande
    if (!user || user.password !== password) {
        return res.status(400).json({ error: "Invalid username or password" });
    }

    // Om användaren finns och lösenordet matchar, returnera ett meddelande om att användaren är inloggad
    res.status(200).json( {
        message : "Logged in successfully"
    });
};

export { registerUser, loginUser };