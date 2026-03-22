const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String, // ✅ always use this (not speciality)
  city: String,
  hospital: String,
  address: String,
  phone: String,
  timing: String,
  rating: Number,
  location: {
    lat: Number,
    lng: Number,
  },
});

module.exports = mongoose.model("Doctor", doctorSchema);
