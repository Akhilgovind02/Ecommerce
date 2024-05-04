require("dotenv").config();
const express = require("express");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const AdminRoutes = require("./routes/adminRoutes")
const cartRoutes = require("./routes/cartRoutes");
const playerRoutes = require("./routes/playerRoutes");
const auctionRoutes = require("./routes/auctionRoutes")
const { connectDB } = require("./config/db");
const cors = require("cors");
const bodyParser = require('body-parser')

connectDB();

const app = express();
app.use(cors());

app.use(express.json());
app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({limit: '500mb', extended: true}));

app.get("/", (req, res) => {
  res.json({ message: "API running..." });
});
app.use("/api/auction",auctionRoutes);
app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin",AdminRoutes)
app.use("/api/cart", cartRoutes);
app.use("/api/players",playerRoutes);

// Handling errors

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
