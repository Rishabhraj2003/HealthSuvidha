const Medicine = require("../models/Medicine");

// Get all medicines
exports.getMedicines = async (req, res) => {
  try {
    const meds = await Medicine.find({});
    res.json(meds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get medicine by ID
exports.getMedicineById = async (req, res) => {
  try {
    const med = await Medicine.findById(req.params.id);
    if (!med) return res.status(404).json({ error: "Medicine not found" });
    res.json(med);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
