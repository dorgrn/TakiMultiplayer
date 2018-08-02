const GameLogic = require("../../engine/GameLogic.js");
const gameUtils = require ("../../utils/gameUtils.js");
const _ = require("lodash");

module.exports = class Game {
    constructor(name, creator, playerLimit){
        this.name = name;
        this.creator = creator;
        this.playerLimit = playerLimit;
        this.players = [];
        this.observers = [];
        this.status = gameUtils.GAME_CONSTS.PENDING;
        this.chat = [];
        this.logic = "";
        this._tempPlayers = [];

        this.addPlayer(creator);
    }

    get isPending(){
        return this.status === gameUtils.GAME_CONSTS.PENDING;
    }

    get isInProgress(){
        return this.status === gameUtils.GAME_CONSTS.IN_PROGRESS;
    }

    get isGameFull(){
        return this.players.length === this.playerLimit;
    }

    setStatusPending(){
        this.status = gameUtils.GAME_CONSTS.PENDING;
    }

    setStatusInProgress(){
        this.status = gameUtils.GAME_CONSTS.IN_PROGRESS;
    }

    isPlayerIn(player){
        return _.find(this.players, (plr) => (plr.name === player.name)) !== undefined ||
            _.find(this.observers, (obs) => (obs.name === player.name)) !== undefined ||
            _.find(this._tempPlayers, (tmp) => (tmp.name === player.name)) !== undefined;
    }

    addPlayer(player){
        if (this.isPlayerIn(player)){
            console.log("Failed to add player to game. player is already in game.");
        }
        else {
            if (!this.isDone)
            {
                if (this.isGameFull || this.isInProgress){
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
    }

    removePlayer(player){
        if (!this.isPlayerIn(player)){
            console.log("Failed to remove player from game. player is not in game.");
        }
        else {
            if (_.find(this.observers, (obs) => (obs.name === player.name)) !== undefined){
                _.remove(this.observers, (obs) => (obs.name === player.name));
            }
            else if (_.find(this.players, (plr) => (plr.name === player.name)) !== undefined) {
                _.remove(this.players, (plr) => (plr.name === player.name));
            }
            else {
                _.remove(this._tempPlayers, (tmp) => (tmp.name === player.name));
            }

            player.setStatusIdle();
            player.gameName = "";
        }

    }

    createGameLogic() {
        for (let i=0; i<this.players.length;i++){
            this.players[i].setStatusPlaying();
        }

        this.setStatusInProgress();
        this.logic = new GameLogic(this.players);
    }

    gameEnded(){
        this.setStatusPending();
        for (let i=0; i<this.players.length;i++){
            const player = this.players[i];
            this._tempPlayers.push(player);
        }

        this.players = [];
        this.chat = [];
    }

    getState(){
        return {
            name: this.name,
            creator: this.creator,
            playerLimit: this.playerLimit,
            players: this.players,
            observers: this.observers,
            status: this.status
        };
    }

    getChat(){
        return this.chat;
    }

    postChat(name, message){
        this.chat.push({
            user: name,
            message: message
        });
    }
};