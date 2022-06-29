const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
const { errorHandler } = require("./middleware/errorMiddleware");
app.use(cors());
app.use("/api/recom", require("./routes/routes.js")); //  main games
app.use("/api/users", require("./routes/userRoutes")); // user manage
app.use("/api/gameRate/", require("./routes/gameRateRoute")); //实际使用的是这个
app.use("/api/userRecomm", require("./routes/recommendationRoutes"));

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/game-recom-sys";

mongoose
  .connect(MONGO_URI)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
app.use(errorHandler);
