const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

const data = [
  {
    app_id: 42700,
    name: "Call of Duty Black Ops",
    recomm_id:
      "287290,235600,21100,224600,391460,222480,55150,268050,47780,2630",
  },
  {
    app_id: 380,
    name: "Half-Life 2 Episode One",
    recomm_id: "220,420,130,6030,12100,377160,2600,280,50,311340",
  },
  {
    app_id: 10,
    name: "Counter-Strike",
    recomm_id: "215470,240,15120,300,282440,80,359550,321360,20,6860",
  },
  {
    app_id: 22600,
    name: "Worms Reloaded",
    recomm_id:
      "375530,200170,98200,312600,108200,312720,276810,217200,254960,295710",
  },
  {
    app_id: 220,
    name: "Half-Life 2",
    recomm_id: "380,420,280,6030,12100,362890,287290,2600,17470,57300",
  },
  {
    app_id: 70,
    name: "Half-Life",
    recomm_id: "280,130,220,6030,380,420,50,12100,362890,10180",
  },
  {
    app_id: 420,
    name: "Half-Life 2 Episode Two",
    recomm_id: "220,380,377160,287290,2600,17470,108710,280,6030,130",
  },
  {
    app_id: 60,
    name: "Ricochet",
    recomm_id: "6030,282440,6860,217140,238210,6910,13240,2270,40,2600",
  },
  {
    app_id: 10180,
    name: "Call of Duty Modern Warfare 2",
    recomm_id: "235600,6030,377160,7940,212630,287700,12120,204100,6020,13570",
  },
  {
    app_id: 400,
    name: "Portal",
    recomm_id: "620,225300,295790,8000,227080,13600,224960,8140,200010,261530",
  },
  {
    app_id: 360,
    name: "Half-Life Deathmatch Source",
    recomm_id: "13210,6030,13230,2210,286690,254700,287290,15120,214870,282440",
  },
  {
    app_id: 20,
    name: "Team Fortress Classic",
    recomm_id: "333930,440,630,359550,22600,13210,300,321360,30,209080",
  },
  {
    app_id: 80,
    name: "Counter-Strike Condition Zero",
    recomm_id: "15120,212630,215470,107410,291480,300,30,65790,1200,359550",
  },
  {
    app_id: 320,
    name: "Half-Life 2 Deathmatch",
    recomm_id: "271590,13210,6030,13240,277430,377160,12120,6020,13230,224600",
  },
  {
    app_id: 30,
    name: "Day of Defeat",
    recomm_id: "300,238750,254960,15120,268400,65790,215470,312600,1200,80",
  },
  {
    app_id: 130,
    name: "Half-Life Blue Shift",
    recomm_id: "380,220,70,420,280,6030,50,377160,2600,6020",
  },
  {
    app_id: 240,
    name: "Counter-Strike Source",
    recomm_id: "15120,80,359550,107410,222880,33930,65790,215470,1200,393380",
  },
  {
    app_id: 40,
    name: "Deathmatch Classic",
    recomm_id: "217140,2200,13210,13230,13240,324810,20,282440,2210,6030",
  },
  {
    app_id: 50,
    name: "Half-Life Opposing Force",
    recomm_id: "6030,377160,2600,220,380,420,6020,280,130,12100",
  },
];

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.get("/", (req, res) => {
  res.json(data);
});

app.post("/", (req, res) => {
  res.json(data);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port: http://localhost:${PORT}`);
});
