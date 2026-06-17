const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// --- USER AUTHENTICATION DEPENDENCIES ---
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("./model/UserModel");

// --- CORE APP DATA MODEL HUB MODULES ---
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

// Enable Cross-Origin Resource Sharing for port 3000 and 3001
app.use(cors());
app.use(bodyParser.json());

// --- HOLDINGS DATA ROUTE ---
app.get("/allHoldings", async (req, res) => {
  try {
    const { user } = req.query;
    // MULTI-USER FILTER: Only fetch records tied to this user string signature
    const filter = user ? { user } : {};
    let allHoldings = await HoldingsModel.find(filter);
    res.json(allHoldings);
  } catch (error) {
    console.error("Failed to fetch holdings:", error);
    res.status(500).json({ message: "Error reading holdings" });
  }
});

// --- POSITIONS DATA ROUTE ---
app.get("/allPositions", async (req, res) => {
  try {
    const { user } = req.query;
    // MULTI-USER FILTER: Only fetch records tied to this user string signature
    const filter = user ? { user } : {};
    let allPositions = await PositionsModel.find(filter);
    res.json(allPositions);
  } catch (error) {
    console.error("Failed to fetch positions:", error);
    res.status(500).json({ message: "Error reading positions" });
  }
});

// --- SAVE NEW TRADING ORDER (POST) ---
app.post("/newOrder", async (req, res) => {
  try {
    // MULTI-USER FIX: Capture the 'user' payload string passed down from your React modal context
    let newOrder = new OrdersModel({
      user: req.body.user || "Trader", 
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
    });

    await newOrder.save();
    res.send("Order saved!");
  } catch (error) {
    console.error("Failed to save order:", error);
    res.status(500).send("Error saving order");
  }
});

// --- RETRIEVE ALL ORDERS HUB PATH ---
app.get("/allOrders", async (req, res) => {
  try {
    const { user } = req.query;
    // MULTI-USER FILTER: Separates historical ledger books instantly
    const filter = user ? { user } : {};
    let allOrders = await OrdersModel.find(filter);
    res.json(allOrders); 
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    res.status(500).json({ message: "Internal server error reading orders" });
  }
});

// --- USER SIGNUP ENDPOINT ---
app.post("/signup", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new UserModel({ 
      email, 
      username, 
      password: hashedPassword 
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!", success: true });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// --- USER LOGIN ENDPOINT ---
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password!", success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password!", success: false });
    }

    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET || "SUPER_SECRET_KEY_DEFAULT_FALLBACK", 
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful!",
      success: true,
      token,
      username: user.username
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// --- CORE MONGOOSE DATABASE ENGINE CONNECTIVITIES INITIALIZATION ---
mongoose.connect(uri)
  .then(() => {
    console.log("MongoDB connected successfully!");
    app.listen(PORT, () => {
      console.log(`App started and listening on port ${PORT}!`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });