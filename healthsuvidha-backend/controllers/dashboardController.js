const Appointment = require("../models/Appointment");
const User = require("../models/User");

exports.getDashboardData = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const appointments = await Appointment.find({ user: req.user._id });

    const pending = appointments.filter(a => a.status === "Pending").length;
    const completed = appointments.filter(a => a.status === "Completed").length;

    res.json({
      user,
      appointments,
      stats: {
        totalAppointments: appointments.length,
        pending,
        completed,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
