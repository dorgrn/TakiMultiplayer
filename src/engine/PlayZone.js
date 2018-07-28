module.exports = class PlayZone {
  constructor() {
    this.cards = [];
  }

  putOnTop(card) {
    this.cards.push(card);
  }

  popTheTop() {
    return this.cards.pop();
  }

  getTop() {
    return this.cards[this.cards.length - 1];
  }

  getUsedCards() {
    return this.cards.splice(0, this.cards.length - 1);
  }

  isEmpty() {
    return this.cards.length === 0;
  }

  copyState() {
    return {
      cards: this.cards.slice()
    };
  }

  init() {
    this.cards = [];
  }
};
