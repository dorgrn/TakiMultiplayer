const auth = require("../users/users");
const games = require("../games/games");

function getBoardState(id) {
  const gameName = auth.userList.getUserById(id).gameName;
  const game = games.gamesList.getGameByGameName(gameName);

  //TODO: this should send a smaller version of boardState. it returns the whole boarState only for debugging reasons.
  return game.logic.getBoardState();
}

function playCard(req, res, next) {
  const player = auth.userList.getUserById(req.session.id);
  const gameName = player.gameName;
  const game = games.gamesList.getGameByGameName(gameName);

  const gameLogic = game.logic;

  //TODO: drawCadsWhenNoLegal should accept LOGIC player object insted of SERVER player object
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
