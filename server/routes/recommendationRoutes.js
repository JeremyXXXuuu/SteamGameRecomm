const express = require("express");
const router = express.Router();

const {
  getRecommendation,
} = require("../controllers/recommendationControllers");
const { protect } = require("../middleware/authMiddleware");
router.route("/").get(protect, getRecommendation);
module.exports = router;
