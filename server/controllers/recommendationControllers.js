const getRecommendation = async (req, res) => {
  const userid = req.user.id;
  console.log(userid);
  const { spawn } = require("child_process");
  const childPython = spawn("python", ["test.py", userid]);
  childPython.stdout.on("data", (data) => {
    res.write(data.toString());
    res.end("end");
  });
};

module.exports = { getRecommendation };
