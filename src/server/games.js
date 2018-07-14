const auth = require("./auth");
const gamesList = {};

function createGameDTOFromParsed(parsedGame) {
  const res = {
    name: parsedGame.name,
    creator: parsedGame.creator,
    players: [],
    playerLimit: parsedGame.playerLimit
  };
  res.players.push(res.creator);

  return res;
}

function addGameToList(req, res, next) {
  let parsedGame = JSON.parse(req.body);

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
  if (gamesList[parsed.gameName] === undefined) {
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

function addUserToGame(req, res, next) {
    // TODO: add the user by userid to the given game
}

function getAllGames() {
  return gamesList;
}

module.exports = {
  addGameToList,
  removeGameFromList,
  getAllGames
};
