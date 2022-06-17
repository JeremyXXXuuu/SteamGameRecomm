import axios from "axios";
// const API_URL = "/api/game/";
const API_URL = "/api/game/test";

//create a game rating

const createGame = async (gameData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, gameData, config);

  return response.data;
};

//Get this game rating
const getGame = async (gameData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/${gameData}`, config);
  if (response) {
    return response.data;
  } else {
    return { store: -1 };
  }
};

//update Game rating

const updateGame = async (gameData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL, gameData, config);
  return response.data;
};

const gameService = {
  createGame,
  getGame,
  updateGame,
};

export default gameService;
