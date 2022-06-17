const express = require("express");

const {
  getGames,
  getGame,
  getDetails,
  getRecomm,
} = require("../controllers/gameRecommControllers");

const router = express.Router();

router.get("/", getGames);
router.get("/:id", getGame);
router.get("/details/:id", getDetails);
router.get("/recomm/:id", getRecomm);

module.exports = router;
