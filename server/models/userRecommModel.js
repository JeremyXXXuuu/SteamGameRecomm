const mongoose = require("mongoose");

const userRecommSchema = mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    // game: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "steam_games2_recommid",
    // },
    appid: Number,
    rating: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserRecomm", userRecommSchema);
