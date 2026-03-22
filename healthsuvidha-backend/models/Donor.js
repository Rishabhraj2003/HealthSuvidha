const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    bloodGroup: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true },
    lastDonationDate: { type: Date },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donor", donorSchema);