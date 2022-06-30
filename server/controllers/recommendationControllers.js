const asyncHandler = require("express-async-handler");
const { spawn } = require("child_process");
const RecomMessage = require("../models/gameRecom.js");
const redis = require("redis");
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const client = redis.createClient(REDIS_PORT);
client.connect();
const getRecommendation = asyncHandler(async (req, res) => {
  const userid = req.user.id.toString();
  var recomGames = [];
  const childPython = spawn("python", ["test.py", userid]);
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
      client.json.set("recomGame", "$", recomGames);
      client.expire("recomGame", 3600); //set expire time 60s
    } catch (error) {
      console.log(error);
    }
  });
});

const cache = async (req, res, next) => {
  try {
    const result = await client.json.get("recomGame");
    if (result !== null) {
      res.status(200).json(result);
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getRecommendation, cache };
