const users = require("../users/users");
const games = require("../games/games");
const gameUtils = require("../../utils/gameUtils");

function buildRelativePlayersArray(user, players){
  const result = [];

  if (user.status === gameUtils.PLAYER_CONSTS.IDLE){
        players.forEach((player)=>result.push(player));
  }
    // the user is player, should get his data only
    else if (user.status === gameUtils.PLAYER_CONSTS.PLAYING){
        const playerAmount = players.length;
        let i = 0;

        //first need to add the user itself to the result
        for( ; i<playerAmount ; i++){
            if (players[i].name === user.name){
                result.push(players[i]);
                break;
            }
        }
        i = (i+1) % playerAmount;

        //then add the other players by order
        for(let j=0 ; j<playerAmount-1 ; j++){
            players[i].hand = undefined;
            result.push(players[i]);
            i = (i+1) % playerAmount;
        }
    }

    return result;
}

function buildRelativeBoardState(user, boardState){
  const players = buildRelativePlayersArray(user, boardState.players);
  const playerTurnName = boardState.players[boardState.turn].name;
  return {
      players: players,
      playerTurnName: playerTurnName,
      playZone: boardState.playZone,
      history: boardState.history,
      stats: boardState.stats
  };
}

function playerAuthentication(req, res, next) {
    const player = users.userList.getUserById(req.session.id);
    const game = games.gamesList.getGameByGameName(player.gameName);
    const activePlayer = game.logic.getActivePlayer();

    if (activePlayer.name !== player.name){
        res.sendStatus(401);
    }
    else{
        next();
    }
}

function getBoardState(req, res, next) {
    const user = users.userList.getUserById(req.session.id);
    if(user.isInGame){
        const game = games.gamesList.getGameByGameName(user.gameName);
        if (game.isInProgress){
            const boardState = game.logic.getBoardState();
            return buildRelativeBoardState(user, boardState);
        }
    }
}

function playCard(req, res, next) {
  const parsedCard = JSON.parse(req.body);
  const player = users.userList.getUserById(req.session.id);
  const game = games.gamesList.getGameByGameName(player.gameName);
  game.logic.playCard(parsedCard.cardId);
  next();
}

function drawCard(req, res, next) {
    const player = users.userList.getUserById(req.session.id);
    const game = games.gamesList.getGameByGameName(player.gameName);
    const activePlayer = game.logic.getActivePlayer();
    game.logic.drawCardsWhenNoLegal(activePlayer);
    next();
}

function colorSelected(req, res, next){
    const parsedColor = JSON.parse(req.body);
    const player = users.userList.getUserById(req.session.id);
    const game = games.gamesList.getGameByGameName(player.gameName);
    game.logic.colorSelected(parsedColor);
    next();
}

function takiClosed(req, res, next){
    const player = users.userList.getUserById(req.session.id);
    const game = games.gamesList.getGameByGameName(player.gameName);
    game.logic.takiClosed();
    next();
}

function gameEnded(req, res, next){
    const player = users.userList.getUserById(req.session.id);
    const game = games.gamesList.getGameByGameName(player.gameName);
    game.status = gameUtils.GAME_CONSTS.DONE;
    next();
}

module.exports = {
  playerAuthentication,
  getBoardState,
  playCard,
  drawCard,
  colorSelected,
  takiClosed,
  gameEnded
};
