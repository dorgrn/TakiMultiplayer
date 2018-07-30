import React from "react";
import ReactDOM from "react-dom";
import "./css/login/login.css";
import BaseContainer from "./components/baseContainer.jsx";
import ViewManager from "./components/viewManager.jsx";
import GameContainer from "./components/gameRoom/gameContainer.jsx";
const gameUtils = require("./utils/gameUtils.js");

ReactDOM.render(<BaseContainer />, document.getElementById("root"));

function testGameContainer() {
  return (
    <GameContainer gameToShow={createTestGame()} />,
    document.getElementById("root")
  );
}

function createTestGame() {
  let game = gameUtils.createGameRecord("game", "dor", 2);
  game.players = ["idan", "dor"];

  return game;
}
