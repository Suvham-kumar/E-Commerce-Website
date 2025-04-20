require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

console.log("🔑 JWT_SECRET:", process.env.JWT_SECRET);

const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); 

// ✅ Routes
app.use("/auth", authRoutes);
app.use("/api/orders", orderRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
