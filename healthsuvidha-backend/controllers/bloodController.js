const Donor = require("../models/Donor");

/* ===============================
   🔹 REGISTER DONOR
=================================*/
exports.registerDonor = async (req, res) => {
  try {
    const { name, age, bloodGroup, city, phone, lastDonationDate } = req.body;

    const donor = new Donor({
      name,
      age,
      bloodGroup,
      city,
      phone,
      lastDonationDate,
      user: req.user?._id, // optional
    });

    await donor.save();

    res.json({
      message: "Donor registered successfully ❤️",
      donor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to register donor ❌" });
  }
};