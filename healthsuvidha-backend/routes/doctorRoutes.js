
const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");

/* =====================================================
   🔍 SEARCH DOCTORS
   GET /api/doctors/search?city=&specialization=
===================================================== */
router.get("/search", async (req, res) => {
  try {
    const { city, specialization } = req.query;

    if (!city || !specialization) {
      return res.status(400).json({
        message: "City and specialization required",
      });
    }

    const doctors = await Doctor.find({
      city: { $regex: city, $options: "i" },
      specialization: { $regex: specialization, $options: "i" },
    });

    if (doctors.length === 0) {
      return res.json([]); // ✅ VERY IMPORTANT
    }

    res.json(doctors);
  } catch (error) {
    console.error("Doctor search error ❌", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* =====================================================
   📋 GET ALL DOCTORS (optional)
===================================================== */
router.get("/", async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
});

module.exports = router;
