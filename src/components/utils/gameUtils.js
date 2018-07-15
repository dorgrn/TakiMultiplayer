const _ = require("lodash");

function getGamesForUser(games, userid) {
  console.log("games:", games);
  console.log("userid", userid);
  const username = userid.name;
  const namesArray = games.players.map(user => user.name);
  const res = _.pickBy(
    games,
    game => {
      console.log("game:", game, "players:", game.players, );
      return game.players && game.players.includes(username)
    }
  );
  console.log("games per user:", res);
  return res;
}

function findFullGames(games) {
  const res = _.pickBy(games, isGameFull);
  console.log("games per user:", res);
  return res;
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
