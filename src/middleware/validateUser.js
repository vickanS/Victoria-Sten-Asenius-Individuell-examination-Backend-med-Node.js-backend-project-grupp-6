import joi from "joi";

// Middleware för att validera en användare
function validateUser(req, res, next) {
  // Definiera ett valideringsschema med Joi
  const userSchema = joi.object({
    username: joi.string().alphanum().min(3).max(15).required(),
    password: joi.string().min(5).required(),
  });
  // Validera req.body mot schemat
  const { error } = userSchema.validate(req.body);
  // Om det finns ett valideringsfel, returnera ett felmeddelande
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  // Om valideringen lyckas, gå vidare till nästa middleware eller route handler
  next();
}

export { validateUser };
