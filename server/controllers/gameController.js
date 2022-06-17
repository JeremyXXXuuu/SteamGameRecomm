const asyncHandler = require("express-async-handler");

const Game = require("../models/gameModel");
const User = require("../models/userModel");

const getGame = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("Please add a id field");
  }
  try {
    const game = await Game.find({
      user: req.user.id,
      game_id: id,
    });
    if (game.length > 0) {
      console.log(game);
      res.status(200).json(game);
    } else {
      res.status(200).json([{ score: -1 }]);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }

  // console.log(game[0].score);
  // console.log(req.user.id);
  // console.log(id);
});

const setGame = asyncHandler(async (req, res) => {
  const { id, text } = req.body;
  if (!id) {
    res.status(400);
    throw new Error("Please add a id field");
  }
  if (!text) {
    res.status(400);
    throw new Error("Please add a score field");
  }
  const game = await Game.create({
    user: req.user.id,
    game_id: id,
    score: text,
  });
  console.log(game.score);
  res.status(200).json(game);
});

const updateGame = asyncHandler(async (req, res) => {
  const { id, text } = req.body;
  if (!id) {
    res.status(400);
    throw new Error("Please add a id field");
  }
  if (!text) {
    res.status(400);
    throw new Error("Please add a score field");
  }
  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  var query = {
    user: req.user.id,
    game_id: req.body.id,
  };
  const updatedGame = await Game.findOneAndUpdate(
    query,
    {
      $set: { score: text },
    },
    { new: true }
  );
  res.status(200).json(updatedGame);
});

module.exports = {
  getGame,
  setGame,
  updateGame,
};
