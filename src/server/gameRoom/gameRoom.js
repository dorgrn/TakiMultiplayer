const auth = require("../auth");
const games = require("../games");

function getBoardState(req, res, next) {
  const gameName = auth.getUserInfo(req.session.id).gameName;
  const game = games.getGameByName(gameName);

  res.send(game.gameLogic);
  next();
}

function playCard(req, res, next) {
  const player = auth.getUserInfo(req.session.id);
  const gameName = player.gameName;
  const game = games.getGameByName(gameName);

  const gameLogic = game.gameLogic;

  gameLogic.drawCardsWhenNoLegal(player);
  next();
}

function drawCard(req, res, next) {}

module.exports = {
  getBoardState,
  playCard,
  drawCard
};
