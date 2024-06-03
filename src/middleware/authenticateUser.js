
async function authenticateUser(req, res, next) {
    // Kontrollera om det finns en global.currentUser (autentiserad användare)
    if (!global.currentUser) {
        // Om det inte finns en autentiserad användare, skicka tillbaka en 400-status (oauktoriserad)
        return res.status(400).send('Unauthorized');
    }
    // Om det finns en autentiserad användare, lägg till användaren i req-objektet för att användas senare
    req.user = global.currentUser;
    // Fortsätt till nästa middleware eller route handler
    next();
}

export { authenticateUser };
