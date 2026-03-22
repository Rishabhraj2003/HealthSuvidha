const express = require("express");
const router = express.Router();

const { registerDonor } = require("../controllers/bloodController");
const protect = require("../middleware/authMiddleware");

router.post("/donate", protect, registerDonor);

module.exports = router;