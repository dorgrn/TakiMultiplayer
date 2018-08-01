const express = require("express");
const gameRoom = require("./gameRoom");
const users = require("../users/users");

const gameRoomManagement = express.Router();

gameRoomManagement.get("/boardState", users.userAuthentication, (req, res) => {
  res.json(gameRoom.getBoardState(req,res));
});

gameRoomManagement.get("/drawCard", users.userAuthentication, gameRoom.playerAuthentication, gameRoom.drawCard, (req, res) => {
  res.sendStatus(200);
});

gameRoomManagement.post("/playCard", users.userAuthentication, gameRoom.playerAuthentication, gameRoom.playCard, (req, res) => {
  res.sendStatus(200);
});

gameRoomManagement.post("/colorSelected", users.userAuthentication, gameRoom.playerAuthentication, gameRoom.colorSelected, (req, res) => {
    res.sendStatus(200);
});

gameRoomManagement.get("/takiClosed", users.userAuthentication, gameRoom.playerAuthentication, gameRoom.takiClosed, (req, res) => {
    res.sendStatus(200);
});

gameRoomManagement.get("/gameEnded", users.userAuthentication, gameRoom.playerAuthentication, gameRoom.gameEnded, (req, res) => {
    res.sendStatus(200);
});


module.exports = gameRoomManagement;
