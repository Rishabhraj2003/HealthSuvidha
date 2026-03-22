

const Doctor = require("../models/Doctor");

exports.searchDoctors = async (req, res) => {
  try {
    const { city, specialization } = req.query;

    console.log("QUERY:", city, specialization);

    const doctors = await Doctor.find({
      city: { $regex: city, $options: "i" },
      specialization: { $regex: specialization, $options: "i" },
    });

    console.log("FOUND:", doctors.length);

    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
