const Player = require("./Player");
const PlayerFactory = require("../engine/PlayerFactory");

module.exports = class PC extends Player {
    constructor(){
        super("PC Player", PlayerFactory.getTypes().PC);
    }
};