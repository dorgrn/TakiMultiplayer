module.exports = class Stopwatch {
  constructor() {
    this.stoppedValue = null;
    this.startMillisecs = 0;
  }

  isStopped() {
    return this.stoppedValue !== null;
  }

  start() {
    this.stoppedValue = null;
    this.startMillisecs = new Date().getTime();
  }

  stop() {
    if (!this.isStopped()) {
      this.stoppedValue = new Date().getTime() - this.startMillisecs;
    }

    return this.stoppedValue;
  }

  getElapsedTime() {
    if (this.isStopped()) {
      return Stopwatch.millisToMinutesAndSeconds(this.stoppedValue);
    }
    return Stopwatch.millisToMinutesAndSeconds(
      new Date().getTime() - this.startMillisecs
    );
  }

  getElapsedTimeInMillis() {
    return new Date().getTime() - this.startMillisecs;
  }

  reset() {
    this.startMillisecs = 0;
  }

  static millisToMinutesAndSeconds(millis) {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }
};
