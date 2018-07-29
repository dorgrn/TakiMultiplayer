const Player = require("./Player");
const PlayerLogic = require("../../engine/Player");

module.exports = class PC extends Player {
    constructor(){
        super("PC Player", PlayerLogic.TYPES.PC);
    }
};