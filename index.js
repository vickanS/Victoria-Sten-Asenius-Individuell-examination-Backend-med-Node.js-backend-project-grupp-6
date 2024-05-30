import express from "express";
import menuRouter from "./routes/coffee.js";
import aboutRouter from "./routes/companyInfo.js";

const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());

// Routes
app.use("/menu", menuRouter);
app.use("/about", aboutRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
