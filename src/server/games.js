const gameLogic = require("../engine/GameLogic.js");

const auth = require("./auth");
const gameUtils = require("../utils/gameUtils");

const gamesList = {};

function doesGameExist(gameName) {
  return gamesList[gameName] !== undefined;
}

function isUserInGame(userName, game) {
  return game.players.includes(userName);
}

function createGameDTOFromParsed(parsedGame) {
  const res = {
    gameName: parsedGame.name,
    creator: parsedGame.creator,
    players: [parsedGame.creator],
    playerAmount: 1,
    playerLimit: parseInt(parsedGame.playerLimit),
    gameLogic: null
  };

  return res;
}

function addGameToList(req, res, next) {
  console.log(" in add GameToList", req);
  const parsedGame = JSON.parse(req.body);

  if (gamesList[parsedGame.name] !== undefined) {
    res.status(403).send("this game name already exist");
  } else {
    gamesList[parsedGame.name] = createGameDTOFromParsed(parsedGame);
    auth.setGameNameForUser(req.session.id, parsedGame.name);
    next();
  }
}

function removeGameFromList(req, res, next) {
  const parsed = JSON.parse(req.body);
  // check game exists
  if (!doesGameExist(parsed.gameName)) {
    res.status(403).send("game does not exist");
  }
  // check that is creator
  else if (auth.getUserInfo(req.session.id).name !== parsed.creator) {
    res
      .status(401)
      .send("user isn't permitted to delete another creator's game");
  } else {
    delete gamesList[parsed.gameName];
    next();
  }
}

function addCurrentUserToGame(req, res, next) {
  const parsed = JSON.parse(req.body);
  const game = gamesList[parsed.gameName];
  const userInfo = auth.getUserInfo(req.session.id);

  if (!game) {
    res.status(404).send("game does not exist");
  } else if (!userInfo) {
    res.status(401).send("user not found");
  } else if (gameUtils.isGameFull(game)) {
    res.status(405).send("game is full");
  } else if (isUserInGame(userInfo.userName, game)) {
    res.status(406).send("user already in game");
  } else {
    game.players.push(userInfo.userName);
    auth.setGameNameForUser(req.session.id, game.name);
    gamesList[parsed.gameName] = game;
    createGameLogic(game.gameName);
    next();
  }
}

function getAllGames() {
  return gamesList;
}

function getGameByName(gameName) {
  return gamesList[gameName];
}

function createGameLogic(gameName) {
  console.log("gameList:", gamesList);
  const game = getGameByName(gameName);
  if (!game) {
    throw "undefined game!";
  }
  if (game.gameLogic !== null) {
    throw "game logic already exists!";
  }

  if (gameUtils.isGameFull(game)) {
    game.gameLogic = new gameLogic(game.players);
    console.log("game after logicCreate", game);
    game.players.forEach(player =>
      auth.setStatusForUser(player, gameUtils.STATUS_CONSTS.PLAYING)
    );
  }

  console.log("Games list:", gamesList);
}

module.exports = {
  addGameToList,
  removeGameFromList,
  getAllGames,
  addCurrentUserToGame,
  getGameByName,
  createGameLogic
};
