const express = require("express");
const gameRoom = require("./gameRoom");

const gameRoomManagement = express.Router();

gameRoomManagement.get("/boardState", gameRoom.getBoardState, (req, res) => {
  res.sendStatus(200);
});

module.exports = gameRoomManagement;
