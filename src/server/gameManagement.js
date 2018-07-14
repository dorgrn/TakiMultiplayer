const express = require("express");
const games = require("./games");

const gameManagement = express.Router();

gameManagement.post("/addGame", games.addGameToList, (req, res) => {
  res.sendStatus(200);
});

gameManagement.post("/deleteGame", games.removeGameFromList, (req, res) => {
  res.sendStatus(200);
});

gameManagement.get("/allGames", (req, res) => {
  res.json(games.getAllGames());
});

module.exports = gameManagement;
