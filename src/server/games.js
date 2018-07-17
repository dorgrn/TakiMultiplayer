const auth = require("./auth");
const gameUtils = require("../components/utils/gameUtils");

const gamesList = {};

function doesGameExist(gameName) {
  return gamesList[gameName] !== undefined;
}

function isUserInGame(userName, game) {
  return game.players.includes(userName);
}
//
// function isGameFull(gameName) {
//   const game = gamesList[gameName];
//   if (game === undefined) {
//     return null;
//   }
//
//   return game.players.length === parseInt(game.playerLimit);
// }

function createGameDTOFromParsed(parsedGame) {
  const res = {
    name: parsedGame.name,
    creator: parsedGame.creator,
    players: [],
    playerLimit: parseInt(parsedGame.playerLimit)
  };
  res.players.push(res.creator.name);

  return res;
}

function addGameToList(req, res, next) {
  const parsedGame = JSON.parse(req.body);

  if (gamesList[parsedGame.name] !== undefined) {
    res.status(403).send("this game name already exist");
  } else {
    gamesList[parsedGame.name] = createGameDTOFromParsed(parsedGame);
    next();
  }
}

function removeGameFromList(req, res, next) {
  const parsed = JSON.parse(req.body);
  // check game exists
  if (!doesGameExist(parsed.name)) {
    res.status(403).send("game does not exist");
  }
  // check that is creator
  else if (auth.getUserInfo(req.session.id).name !== parsed.creator) {
    res
      .status(401)
      .send("user isn't permitted to delete another creator's game");
  } else {
    delete gamesList[parsed.name];
    next();
  }
}

function addCurrentUserToGame(req, res, next) {
  const parsed = JSON.parse(req.body);
  const game = gamesList[parsed.gameName];
  const user = auth.getUserInfo(req.session.id);

  if (!game) {
    res.status(404).send("game does not exist");
  } else if (!user) {
    res.status(401).send("user not found");
  } else if (gameUtils.isGameFull(game)) {
    res.status(405).send("game is full");
  } else if (isUserInGame(user.name, game)) {
    res.status(406).send("user already in game");
  } else {
    game.players.push(user.name);
    gamesList[parsed.gameName] = game;
    next();
  }
}

function getAllGames() {
  return gamesList;
}

module.exports = {
  addGameToList,
  removeGameFromList,
  getAllGames,
  addUserToGame: addCurrentUserToGame
};
