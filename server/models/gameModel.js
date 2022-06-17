const mongoose = require("mongoose");

const gameSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    // game: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "steam_games2_recommid",
    // },

    game_id: Number,
    score: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Game", gameSchema);
