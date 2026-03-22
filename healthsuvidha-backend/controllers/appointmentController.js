const Appointment = require("../models/Appointment");

exports.createAppointment = async (req, res) => {
  try {
    const { doctorId, doctorName, specialization, city, date } = req.body;

    // ❌ Prevent double booking (same doctor, same date)
    const existing = await Appointment.findOne({
      doctorId,
      date,
    });

    if (existing) {
      return res.status(400).json({
        message: "❌ This doctor is already booked for this date!",
      });
    }

    const appointment = new Appointment({
      doctorId,
      doctorName,
      specialization,
      city,
      date,
      user: req.user.id, // ✅ MUST
    });

    await appointment.save();

    res.status(201).json({
      message: "✅ Appointment booked successfully!",
      appointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "❌ Server error while booking appointment",
    });
  }
};

// ✅ GET user appointments
exports.getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "❌ Error fetching appointments",
    });
  }
};
