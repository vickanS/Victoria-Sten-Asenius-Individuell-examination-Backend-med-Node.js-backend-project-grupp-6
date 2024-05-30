import express from "express";
import menuRouter from "./routes/coffee.js";

const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());

// Routes
app.use("/menu", menuRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
