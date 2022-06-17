const express = require("express");
const router = express.Router();

const {
  getGame,
  setGame,
  updateGame,
} = require("../controllers/userRecommController");
const { protect } = require("../middleware/authMiddleware");
router.route("/:id").get(protect, getGame);

router.route("/").post(protect, setGame).put(protect, updateGame);
module.exports = router;
