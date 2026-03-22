const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  name: String,
  price: Number,
  company: String,
  desc: String,
  category: String, // e.g., "Pain Relief", "Vitamin", "Diabetes"
});

module.exports = mongoose.model("Medicine", medicineSchema);
