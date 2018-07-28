const _ = require("lodash");

const STATUS_CONSTS = {
  IDLE: "idle",
  PLAYING: "playing"
};

function isGameFull(game) {
  if (!game) throw "game not defined!";
  return game.players.length === game.playerLimit;
}

function createGameRecord(name, creator, playerLimit) {
  return {
    name: name,
    creator: creator,
    playerLimit: playerLimit
  };
}

module.exports = {
  isGameFull,
  createGameRecord,
  STATUS_CONSTS
};
