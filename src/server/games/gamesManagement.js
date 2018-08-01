const express = require("express");
const games = require("./games");
const users = require("../users/users");
const gameManagement = express.Router();

gameManagement.post("/addGame", games.addGameToList, (req, res) => {
  res.sendStatus(200);
});

gameManagement.post("/deleteGame", games.removeGameFromList, (req, res) => {
  res.sendStatus(200);
});

gameManagement.get("/allGames", (req, res) => {
  res.json(games.gamesList.getAll());
});

gameManagement.post("/joinGame", games.addCurrentUserToGame, (req,res) =>{
  // check if game is now full and respond accordingly
  res.sendStatus(200);
});

gameManagement.get("/leaveGame", games.removeCurrentUserFromGame, (req,res) => {
  res.sendStatus(200);
});

gameManagement.get("/getGame", users.userAuthentication, (req, res) => {
  res.json(games.getGame(req,res));
});

module.exports = gameManagement;
