const Player = require("./Player");
const PlayerFactory = require("../engine/PlayerFactory");

module.exports = class User extends Player {
    constructor(name){
        super(name, PlayerFactory.getTypes().USER);
    }
};