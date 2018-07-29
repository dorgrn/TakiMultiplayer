const gameUtils = require("../utils/gameUtils");
const PlayerFactory = require("../engine/PlayerFactory");


module.exports = class Player {
    constructor(name, type){
        this.name = name;
        this.type = type;
        this.gameName = "";
        this.status = gameUtils.STATUS_CONSTS.IDLE;
    }

    get isPlaying(){
        return this.status === gameUtils.STATUS_CONSTS.PLAYING;
    }

    get isIdle(){
        return this.status === gameUtils.STATUS_CONSTS.IDLE;
    }

    get isUser(){
        return this.type === PlayerFactory.getTypes().USER;
    }

    get isPC(){
        return this.type === PlayerFactory.getTypes().PC;
    }

    setStatusPlaying(){
        this.status = gameUtils.STATUS_CONSTS.PLAYING;
    }

    setStatusIdle(){
        this.status = gameUtils.STATUS_CONSTS.IDLE;
    }

    getState(){
        return {
            name: this.name,
            type: this.type,
            gameName: this.gameName,
            status: this.status
        }
    }
};