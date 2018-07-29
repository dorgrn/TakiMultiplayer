const _ = require("lodash");

const STATUS_CONSTS = {
  IDLE: "idle",
  PLAYING: "playing"
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
  STATUS_CONSTS
};
