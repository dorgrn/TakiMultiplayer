const auth = require("../auth");
const games = require("../games");

function getBoardState() {
  const gameName = auth.getUserInfo(req.session.id).gameName;
  const game = games.getGameByName(gameName);
  const gameLogic = game.gameLogic;

  return game.gameLogic;
}


module.exports = {
  getBoardState
};
