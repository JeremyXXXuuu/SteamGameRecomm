import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as api from "../api/index.js";

import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Test = () => {
  const { id } = useParams();
  const url = `/recom/recomm/${id}`;
  const { data, error } = useSWR(url, fetcher);
  const initialGameState = {
    id: null,
    app_id: [],
    url: "",
    name: "",
    recomm_id: "",
  };

  const [currentGame, setCurrentGame] = useState(initialGameState);

  const [gameDetails, setGameDetails] = useState("");

  const getGame = (id) => {
    api
      .get(id)
      .then((res) => {
        console.log(res.data);
        const data = res.data;
        setCurrentGame(...data);
        console.log(currentGame);
      })
      .catch((e) => {
        console.log(e);
        console.log("can't get game");
      });
  };

  const getDetails = (gid) => {
    api
      .getGameDetails(gid)
      .then((res) => {
        setGameDetails(res.data[gid].data.short_description);
        console.log(res.data[gid].data.short_description);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getGame(id);
    getDetails(id);
  }, [id]);
  console.log(data);

  if (error) return "An error has occurred.";
  if (!data) return "Loading...";
  return (
    <div>
      <h1>Game Name: {currentGame.name}</h1>
      <h1>Game id: {currentGame.app_id}</h1>
      <h1>Game url: {currentGame.url}</h1>
      <h1>Game recomm: {currentGame.recomm_id}</h1>
      <h1>Game details: {gameDetails}</h1>
      <h1>
        {data.map((game) => {
          return game.name;
        })}
      </h1>
    </div>
  );
};

export default Test;
