import express from "express";
import menuRouter from "./routes/menu.js";
import aboutRouter from "./routes/companyInfo.js";
import orderRouter from "./routes/order.js";

const app = express();
const PORT = 8001;

// Middleware
app.use(express.json());

// Routes
app.use("/menu", menuRouter);
app.use("/about", aboutRouter);
app.use("/order", orderRouter);
app.use("/orders", orderRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});