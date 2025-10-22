const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getDahsboardData } = require("../controllers/dashboardController.js");
const router = express.Router();

router.get("/", protect, getDahsboardData);

module.exports = router;
