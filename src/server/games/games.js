const auth = require("../users/users");
const GamesList = require("../serverObjects/GamesList.js");
const Game = require("../serverObjects/Game.js");

const gamesList = new GamesList();

function addGameToList(req, res, next) {
  const parsedGame = JSON.parse(req.body);
  const gameName = parsedGame.gameName;
  const creator = auth.userList.getUserById(req.session.id);

  if (gamesList.isGameNameExists(gameName)) {
    res.status(403).send("this game name already exist");
  } else {
    const game = new Game(gameName, creator, parseInt(parsedGame.playerLimit));
    gamesList.add(gameName, game);
    if (parsedGame.shouldAddPCPlayer){
      const pcPlayer = auth.createPCPlayer();
      game.addPlayer(pcPlayer);
    }
    next();
  }
}

function removeGameFromList(req, res, next) {
  const parsed = JSON.parse(req.body);
  const gameName = parsed.gameName;
  // check game exists
  if (!gamesList.isGameNameExists(gameName)) {
    res.status(403).send("game does not exist");
  }
  // check that is creator
  else if (auth.userList.getUserById(req.session.id).name !== parsed.creator) {
    res
      .status(401)
      .send("user isn't permitted to delete another creator's game");
  } else {
    gamesList.remove(gameName);
    next();
  }
}

function addCurrentUserToGame(req, res, next) {
  const parsed = JSON.parse(req.body);
  const game = gamesList.getGameByGameName(parsed.gameName);
  const user = auth.userList.getUserById(req.session.id);

  if (!game) {
    res.status(404).send("game does not exist");
  } else if (!user) {
    res.status(401).send("user not found");
  } else if (game.isGameFull) {
    res.status(405).send("game is full");
  } else if (game.isPlayerIn(user)) {
    res.status(406).send("user already in game");
  } else {
    game.addPlayer(user);
    next();
  }
}

function removeCurrentUserFromGame(req, res, next) {
    const parsed = JSON.parse(req.body);
    const game = gamesList.getGameByGameName(parsed.gameName);
    const user = auth.userList.getUserById(req.session.id);

    if (!game) {
        res.status(404).send("game does not exist");
    } else if (!user) {
        res.status(401).send("user not found");
    } else if (!game.isPlayerIn(user)) {
        res.status(406).send("user is not in game");
    } else {
        game.removePlayer(user);
        next();
    }
}


module.exports = {
  gamesList,
  addGameToList,
  removeGameFromList,
  addCurrentUserToGame,
  removeCurrentUserFromGame
};
