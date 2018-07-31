const Post = require("./Post.js");

module.exports = class History {
  constructor() {
    this.posts = [];
  }

  pushGamePost(time, content) {
    this.posts.push(new Post("Game", time, "", content));
  }

  pushPlayerPost(time, turn, content) {
    this.posts.push(new Post("Player", time, turn, content));
  }

  gamePostTakiOpened(time) {
    this.pushGamePost(time, "Taki card was opened.");
  }

  gamePostTakiClosed(time) {
    this.pushGamePost(time, "Taki card was closed.");
  }

  gamePostColorChanged(time, color) {
    this.pushGamePost(time, "Color has changed to " + color + ".");
  }

  gamePostReverseDirection(time) {
    this.pushGamePost(time, "Direction was changed.");
  }

  gamePostStopPlayer(time, player) {
    this.pushGamePost(time, player.name + " was stopped.");
  }

  playerPostDraw(time, turn, player, cardAmount) {
    this.pushPlayerPost(
      time,
      turn,
      player.name + " draw " + cardAmount + " cards from deck."
    );
  }

  playerPostPlay(time, turn, player, card) {
    let cardName;
    if (card.isValueCard()) {
      cardName = card.value + " " + card.color;
    } else {
      cardName = card.type + " " + card.color;
    }

    this.pushPlayerPost(
      time,
      turn,
      player.name + " played with card " + cardName + "."
    );
  }

  playerPostDone(time, turn, player) {
    this.pushPlayerPost(time, turn, player.name + " finished his cards.");
  }

  clearHistory() {
    this.posts = [];
  }

  copyState() {
    return {
      posts: this.posts.slice()
    };
  }
};
