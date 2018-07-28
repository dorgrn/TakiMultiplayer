const express = require("express");
const gameRoom = require("./gameRoom");
const auth = require("../auth");

const gameRoomManagement = express.Router();

gameRoomManagement.get("/boardState", auth.userAuthentication, gameRoom.getBoardState, (req, res) => {
  res.sendStatus(200);
});

gameRoomManagement.post("/drawCard", auth.userAuthentication, gameRoom.drawCard, (req, res) => {
  res.sendStatus(200);
});

gameRoomManagement.post("/playCard", auth.userAuthentication, gameRoom.playCard, (req, res) => {
  res.sendStatus(200);
});


module.exports = gameRoomManagement;
