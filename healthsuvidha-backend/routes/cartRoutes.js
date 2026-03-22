const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { medicineId, name, price, quantity } = req.body;

    if (!medicineId || !name || !price) {
      return res.status(400).json({ message: "Missing fields" });
    }

    let item = await Cart.findOne({ user: req.user.id, medicineId });

    if (item) {
      item.quantity += quantity;
      await item.save();
    } else {
      item = new Cart({
        user: req.user.id,
        medicineId,
        name,
        price,
        quantity,
      });
      await item.save();
    }

    res.status(201).json({ message: "Added to cart ✅", item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  const items = await Cart.find({ user: req.user.id });
  res.json(items);
});

module.exports = router;
