import express from "express";
import menuRouter from "./src/routes/menu.js"
import aboutRouter from "./src/routes/companyInfo.js";
import orderRouter from "./src/routes/order.js";
import userRouter from "./src/routes/users.js";

const app = express();
const PORT = 8001;

// Middleware
app.use(express.json());

// Routes
app.use("/menu", menuRouter);
app.use("/about", aboutRouter);
app.use("/order", orderRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});