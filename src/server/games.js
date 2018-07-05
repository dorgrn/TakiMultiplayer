const auth = require("./auth");
const gamesList = {};

function addGameToList(req, res, next) {
  const parsedGame = JSON.parse(req.body);

  if (gamesList[parsedGame.gameName] !== undefined) {
    res.status(403).send("this game name already exist");
  } else {
    gamesList[parsedGame.gameName] = parsedGame;
    next();
  }
}

function removeGameFromList(req, res, next) {
  const parsed = JSON.parse(req.body);
  // check game exists
  if (gamesList[parsed.gameName] === undefined) {
    res.status(403).send("game does not exist");
  }
  // check that is author
  else if (auth.getUserInfo(req.session.id).name !== parsed.author) {
    res
      .status(401)
      .send("user isn't permitted to delete another author's game");
  } else {
    delete gamesList[parsed.gameName];
    next();
  }
}

function getAllGames() {
  return gamesList;
}

module.exports = {
  addGameToList,
  removeGameFromList,
  getAllGames
};
