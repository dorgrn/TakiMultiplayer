const _ = require("lodash");

const PLAYER_CONSTS = {
  IDLE: "idle",
  PLAYING: "playing"
};

const GAME_CONSTS = {
  PENDING: "pending",
  IN_PROGRESS: "in progress"
};

function createGameRecord(name, playerLimit, shouldAddPCPlayer) {
  return {
    gameName: name,
    playerLimit: playerLimit,
    shouldAddPCPlayer: shouldAddPCPlayer
  };
}

module.exports = {
  createGameRecord,
  PLAYER_CONSTS,
  GAME_CONSTS
};
