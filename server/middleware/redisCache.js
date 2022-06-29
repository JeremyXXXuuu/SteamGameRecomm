const cache = async (req, res, next) => {
  try {
    const result = await client.json.get("recommGame");
    if (result !== null) {
      res.send(result);
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = cache;
