const List = require("./List.js");


module.exports = class GamesList extends List{
    constructor(){
        super();
    }

    isGameNameExists(gameName){
        return this.isKeyExists(gameName);
    }

    getGameByGameName(gameName){
        return this.list[gameName];
    }

    getAll(){
        const games = {};
        for (let gameName in this.list) {
            const game = this.list[gameName];
            games[gameName]=game.getState();
        }

        return games;
    }
};