const auth = require("../auth");
const games = require("../games");

function getBoardState(req, res, next) {
  const gameName = auth.userList.getUserById(req.session.id).gameName;
  const game = games.gamesList.getGameByGameName(gameName);

  res.send(game.gameLogic);
  next();
}

function playCard(req, res, next) {
  const player = auth.userList.getUserById(req.session.id);
  const gameName = player.gameName;
  const game = games.gamesList.getGameByGameName(gameName);

  const gameLogic = game.gameLogic;

  gameLogic.drawCardsWhenNoLegal(player);
  next();
}

function drawCard(req, res, next) {
  const card = req.body.card;

}

module.exports = {
  getBoardState,
  playCard,
  drawCard
};
