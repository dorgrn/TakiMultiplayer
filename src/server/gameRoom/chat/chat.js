const users = require("../../users/users");
const games = require("../../games/games");

function getChat(req, res){
    const user = users.userList.getUserById(req.session.id);
    const game = games.gamesList.getGameByGameName(user.gameName);
    return game.getChat();
}

function postChat(req, res){
    const message = req.body;
    const user = users.userList.getUserById(req.session.id);
    const game = games.gamesList.getGameByGameName(user.gameName);

    game.postChat(user.name, message);
}

module.exports = {
  getChat,
  postChat
};
