const User = require("../models/User");
const bcrypt = require("bcryptjs");

/* ===============================
   🔹 GET PROFILE (Auto Fetch)
=================================*/
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

/* ===============================
   🔹 UPDATE PROFILE
=================================*/
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.phone = req.body.phone ?? user.phone;
    user.gender = req.body.gender ?? user.gender;
    user.age = req.body.age ?? user.age;
    user.bloodGroup = req.body.bloodGroup ?? user.bloodGroup;
    user.city = req.body.city ?? user.city;
    user.emergencyContact = req.body.emergencyContact ?? user.emergencyContact;

    if (req.file) {
      user.photo = req.file.path;
    }

    const updatedUser = await user.save();

    // ✅ REMOVE PASSWORD BEFORE SENDING
    const userWithoutPassword = await User.findById(updatedUser._id).select(
      "-password",
    );

    res.json({
      message: "Profile updated successfully ✅",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Profile update failed ❌" });
  }
};

/* ===============================
   🔹 CHANGE PASSWORD
=================================*/
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);

    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password incorrect ❌" });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password changed successfully ✅" });
  } catch (error) {
    res.status(500).json({ message: "Password change failed ❌" });
  }
};

/* ===============================
   🔹 DELETE ACCOUNT
=================================*/
exports.deleteAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    res.json({ message: "Account deleted successfully 🗑️" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed ❌" });
  }
};
