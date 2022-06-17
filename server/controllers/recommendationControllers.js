const asyncHandler = require("express-async-handler");
const { spawn } = require("child_process");
const RecomMessage = require("../models/gameRecom.js");

const getRecommendation = asyncHandler(async (req, res) => {
  const userid = req.user.id.toString();
  const childPython = spawn("python", ["test.py", userid]);
  var recomGames = [];
  childPython.stdout.on("data", async (data) => {
    let game = data.toString().split(",");
    game.pop();
    game.map((element) => {
      return Number(element);
    });
    try {
      await Promise.all(
        game.map(async (r) => {
          const recomGame = await RecomMessage.find({ app_id: r });
          var a = recomGame[0];

          recomGames.push(a);
        })
      );

      res.status(200).json(recomGames);
    } catch (error) {
      console.log(error);
    }
  });
});

module.exports = { getRecommendation };
