const Stopwatch = require("./Stopwatch");

module.exports = class Stats {
  constructor() {
    this.gameWatch = new Stopwatch();
    this.gamesAmount = 0;
    this.turnAmount = 0;
  }
  getElapsedTime() {
    return this.gameWatch.getElapsedTime();
  }

  resetGameStats() {
    this.gameWatch.reset();
    this.turnAmount = 0;
  }

  copyState() {
    return {
      gamesAmount: this.gamesAmount,
      turnAmount: this.turnAmount,
      gameElapsedTime: this.getElapsedTime()
    };
  }
};
