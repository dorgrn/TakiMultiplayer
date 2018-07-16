const _ = require("lodash");

function getGamesForUser(games, userid) {
  const username = userid.name;
  return _.pickBy(games, game => _.includes(game.players, username));
}

function findFullGames(games) {
  return _.pickBy(games, isGameFull);
}

function isGameFull(game) {
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
  getGamesForUser,
  findFullGames,
  isGameFull,
  createGameRecord
};
