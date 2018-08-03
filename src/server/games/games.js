const users = require("../users/users");
const GamesList = require("../serverObjects/GamesList.js");
const Game = require("../serverObjects/Game.js");

const gamesList = new GamesList();

function addGameToList(req, res, next) {
  const parsedGame = JSON.parse(req.body);
  const gameName = parsedGame.gameName;
  const creator = users.userList.getUserById(req.session.id);

  if (gamesList.isGameNameExists(gameName)) {
    res.status(403).send("this game name already exist");
  } else {
    const game = new Game(gameName, creator, parseInt(parsedGame.playerLimit));
    gamesList.add(gameName, game);
    if (parsedGame.shouldAddPCPlayer){
      const pcPlayer = users.createPCPlayer();
      game.addPlayer(pcPlayer);
    }
    next();
  }
}

function removeGameFromList(req, res, next) {
    const gameName = JSON.parse(req.body);
    const user = users.userList.getUserById(req.session.id);
    // check game exists
    if (!gamesList.isGameNameExists(gameName)) {
        res.status(403).send("game does not exist");
    }
    // check that is creator
    else {
        const game = gamesList.getGameByGameName(gameName);
        if (user.name !== game.creator.name) {
            res
                .status(401)
                .send("user isn't permitted to delete another creator's game");
        }
        else if (game.players.length > 1 ||
            (game.players.length===1 && !game.isPCPlayerIn)) {
            res
                .status(401)
                .send("user can't delete game while other players in it");
        }
        else {
            gamesList.remove(gameName);
            next();
        }
    }
}

function addCurrentUserToGame(req, res, next) {
  const gameName = JSON.parse(req.body);
  const game = gamesList.getGameByGameName(gameName);
  const user = users.userList.getUserById(req.session.id);

  if (!game) {
    res.status(404).send("game does not exist");
  } else if (!user) {
    res.status(401).send("user not found");
  } else if (game.isPlayerIn(user)) {
    res.status(406).send("user already in game");
  } else {
    game.addPlayer(user);
    next();
  }
}

function removeCurrentUserFromGame(req, res, next) {
    const user = users.userList.getUserById(req.session.id);
    const game = gamesList.getGameByGameName(user.gameName);

    if (!game) {
        user.setStatusIdle();
        user.gameName = "";
        next();
    } else if (!user) {
        res.status(401).send("user not found");
    } else if (!game.isPlayerIn(user)) {
        res.status(406).send("user is not in game");
    } else {
        game.removePlayer(user);
        next();
    }
}

function getGame(req, res, next){
    const user = users.userList.getUserById(req.session.id);

    if (!user.isInGame){
        res.status(404).send("game does not exist");
        return;
    }

    const gameName = user.gameName;
    return gamesList.getGameByGameName(gameName).getState();
}


module.exports = {
  gamesList,
  addGameToList,
  removeGameFromList,
  addCurrentUserToGame,
  removeCurrentUserFromGame,
  getGame
};
