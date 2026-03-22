
const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const authMiddleware = require("../middleware/authMiddleware");

// =====================================================
// ✅ BOOK APPOINTMENT
// POST /api/appointments
// =====================================================
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { doctorId, doctorName, specialization, city, date, disease } = req.body;

    if (!doctorId || !date) {
      return res.status(400).json({ message: "Doctor and date required ❌" });
    }

    // 🔥 Prevent double booking for same doctor & date
    const existing = await Appointment.findOne({ doctorId, date });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Doctor already booked on this date ❌" });
    }

    const appointment = new Appointment({
      doctorId,
      doctorName,
      specialization,
      city,
      date,
      disease,
      status: "Confirmed",
      user: req.user.id,
    });

    await appointment.save();

    res.status(201).json({
      message: "Appointment booked successfully ✅",
      appointment,
    });
  } catch (error) {
    console.error("Appointment Booking Error ❌", error);
    res.status(500).json({ message: "Server error" });
  }
});

// =====================================================
// 📋 GET MY APPOINTMENTS
// GET /api/appointments/my
// =====================================================
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Fetch Appointments Error ❌", error);
    res.status(500).json({ message: "Server error" });
  }
});

// =====================================================
// 🔄 CANCEL APPOINTMENT
// PUT /api/appointments/cancel/:id
// =====================================================
router.put("/cancel/:id", authMiddleware, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found ❌" });
    }

    if (appointment.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized ❌" });
    }

    appointment.status = "Cancelled";
    await appointment.save();

    res.json({
      message: "Appointment cancelled successfully ✅",
      appointment,
    });
  } catch (error) {
    console.error("Cancel Appointment Error ❌", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;