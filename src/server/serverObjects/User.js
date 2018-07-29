const Player = require("./Player");
const PlayerLogic = require("../../engine/Player");

module.exports = class User extends Player {
    constructor(name){
        super(name, PlayerLogic.TYPES.USER);
    }
};