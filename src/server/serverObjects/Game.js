const GameLogic = require("../../engine/GameLogic.js");
const _ = require("lodash");

module.exports = class Game {
    constructor(name, creator, playerLimit){
        this.name = name;
        this.creator = creator;
        this.playerLimit = playerLimit;
        this.players = [];
        this.observers = [];
        this.logic = "";

        this.addPlayer(creator);
    }

    get isGameFull(){
        return this.players.length === this.playerLimit;
    }

    isPlayerIn(player){
        return _.find(this.players, (plr) => (plr.name === player.name)) !== undefined ||
            _.find(this.observers, (obs) => (obs.name === player.name)) !== undefined;
    }

    addPlayer(player){
        if (this.isPlayerIn(player)){
            console.log("Failed to add player to game. player is already in game.");
        }
        else {
            if (this.players.length === this.playerLimit){
                this.observers.push(player);
            }
            else{
                this.players.push(player);
                if (this.isGameFull){
                    this.createGameLogic();
                }
            }

            player.gameName = this.name;
        }
    }

    removePlayer(player){
        if (!this.isPlayerIn(player)){
            console.log("Failed to remove player to game. player is not in game.");
        }
        else {
            if (_.find(this.observers, (obs) => (obs.name === player.name)) !== undefined){
                _.remove(this.observers, (obs) => (obs.name === player.name));
            }
            else{
                _.remove(this.players, (plr) => (plr.name === player.name));
                player.setStatusIdle();
            }

            player.gameName = "";
        }

    }

    createGameLogic() {
        for (let i=0; i<this.players.length;i++){
            this.players[i].setStatusPlaying();
        }

        this.logic = new GameLogic(this.players);
    }

    getState(){
        return {
            name: this.name,
            creator: this.creator,
            playerLimit: this.playerLimit,
            players: this.players,
            observers: this.observers
        };
    }


};