const express = require("express");
const router = express.Router();
const { addCity, getCities } = require("../controllers/cityController");

router.post("/add", addCity);   // for testing
router.get("/", getCities);

module.exports = router;
