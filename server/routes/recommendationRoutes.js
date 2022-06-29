const express = require("express");
const router = express.Router();

const {
  getRecommendation,
  cache,
} = require("../controllers/recommendationControllers");
const { protect } = require("../middleware/authMiddleware");
router.route("/").get(protect, cache, getRecommendation);
module.exports = router;
