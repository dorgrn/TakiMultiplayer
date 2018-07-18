import React from "react";
import ReactDOM from "react-dom";
import "./css/register.css";
import BaseContainer from "./components/baseContainer.jsx";
import GameContainer from "./components/gameRoom/gameContainer.jsx";
const gameUtils = require("./utils/gameUtils.js");

let game = gameUtils.createGameRecord("game", "dor", 2);
const players = ["dor", "misho"];
game.players = players;

ReactDOM.render(
  <GameContainer gameToShow={game} />,
  document.getElementById("root")
);
