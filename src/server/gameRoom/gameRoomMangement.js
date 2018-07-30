const express = require("express");
const gameRoom = require("./gameRoom");
const auth = require("../users/users");

const gameRoomManagement = express.Router();

gameRoomManagement.get("/boardState", auth.userAuthentication, (req, res) => {
  res.json(gameRoom.getBoardState(req.session.id));
});

gameRoomManagement.get("/drawCard", auth.userAuthentication, gameRoom.drawCard, (req, res) => {
  res.sendStatus(200);
});

gameRoomManagement.post("/playCard", auth.userAuthentication, gameRoom.playCard, (req, res) => {
  res.sendStatus(200);
});


module.exports = gameRoomManagement;
