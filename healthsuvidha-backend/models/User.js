
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    // 🔥 ADD THESE FIELDS
    phone: {
      type: String,
      default: "",
    },

    gender: {
      type: String,
      default: "",
    },

    age: {
      type: Number,
      default: null,
    },

    bloodGroup: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    emergencyContact: {
      type: String,
      default: "",
    },

    photo: {
      type: String, // Cloudinary URL or local path
      default: "",
    },
  },
  { timestamps: true },
);

/* 🔐 HASH PASSWORD BEFORE SAVE */
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/* 🔑 MATCH PASSWORD */
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
