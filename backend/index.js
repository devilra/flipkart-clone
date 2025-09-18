const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

// Routes
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/cart", require("./routes/cartRoutes"));
// app.use("/api/products", require("./routes/productRoutes"));
// app.use("/api/orders", require("./routes/orderRoutes"));

// Error Middleware
// const { errorHandler } = require("./middleware/errorMiddleware");
// app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
