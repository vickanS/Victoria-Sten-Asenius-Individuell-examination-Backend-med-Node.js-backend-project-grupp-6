import express from "express";
import menuRouter from "./routes/coffee.js";
import aboutRouter from "./routes/companyInfo.js";
import orderRouter from "./routes/coffee.js";

const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());

// Routes
app.use("/menu", menuRouter);
app.use("/about", aboutRouter);

// post new order
app.use("/order", orderRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
