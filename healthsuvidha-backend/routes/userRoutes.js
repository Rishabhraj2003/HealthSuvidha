

const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount,
} = require("../controllers/userController");

// ✅ Routes
router.get("/profile", protect, getProfile);
router.put("/update", protect, upload.single("photo"), updateProfile);
router.put("/change-password", protect, changePassword);
router.delete("/delete", protect, deleteAccount);

module.exports = router;
