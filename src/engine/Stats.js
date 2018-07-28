import Stopwatch from "./Stopwatch";

export default class Stats{
    constructor() {
        this.gameWatch = new Stopwatch();
        this.turnAmount = 0;
        this.isGameEnded = false;
    }
    getElapsedTime() {
        return this.gameWatch.getElapsedTime();
    }

    resetGameStats(){
        this.gameWatch.reset();
        this.turnAmount = 0;
        this.isGameEnded = false;
    }

    copyState() {
        return {
            turnAmount: this.turnAmount,
            gameElapsedTime: this.getElapsedTime(),
            isGameEnded: this.isGameEnded
        };
    }
}