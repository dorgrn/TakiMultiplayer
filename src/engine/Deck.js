//const cardFactory = require("../engine/CardFactory.js");
const Card = require("./Card");

function createDeck() {
  let cardIdCounter = 1;
  let newCard;

  clearDeck.call(this);
  // value cards
  Card.VALUES.forEach(value => {
    for (let i = 0; i < this.VALUE_CARDS; i++) {
      Card.COLORS.forEach(color => {
        newCard = new Card(
          cardIdCounter++,
          color,
          "value",
          getFilename(value, color),
          value
        );
        this.insertCard(newCard);
      });
    }
  });

  // special cards
  Card.SPECIAL_CARDS.forEach(type => {
    for (let i = 0; i < this.SPECIAL_CARDS; i++) {
      Card.COLORS.forEach(color => {
        newCard = new Card(
          cardIdCounter++,
          color,
          type,
          getFilename(type, color)
        );
        this.insertCard(newCard);
      });
    }
  });

  // supercard change color
  for (let i = 0; i < this.SUPER_CARD_CHANGE_COLOR; i++) {
    newCard = new Card(
      cardIdCounter++,
      "colorful",
      Card.SUPER_CARDS[0],
      getFilename(Card.SUPER_CARDS[0], "colorful")
    );
    this.insertCard(newCard);
  }

  // supercard super taki
  for (let i = 0; i < this.SUPER_CARD_SUPER_TAKI; i++) {
    newCard = new Card(
      cardIdCounter++,
      "colorful",
      Card.SUPER_CARDS[1],
      getFilename(Card.SUPER_CARDS[1], "colorful")
    );
    this.insertCard(newCard);
  }

  shuffle.call(this);
}

function clearDeck() {
  this.cards = [];
}

function shuffle() {
  let j, x, i;
  const cards = this.cards;
  for (i = cards.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = cards[i];
    cards[i] = cards[j];
    cards[j] = x;
  }
}

function getFilename(type, color) {
  return type + (color ? "_" + color : "");
}

module.exports = class Deck {
  constructor() {
    this.cards = [];
    this.VALUE_CARDS = 2;
    this.SPECIAL_CARDS = 2;
    this.SUPER_CARD_CHANGE_COLOR = 4;
    this.SUPER_CARD_SUPER_TAKI = 2;

    createDeck.call(this);
  }

  init() {
    clearDeck.call(this);
    createDeck.call(this);
  }

  drawCard() {
    return this.cards.pop();
  }

  insertCard(card) {
    const randomIndex = Math.floor(Math.random() * this.cards.length);
    this.cards.splice(randomIndex, 0, card);
  }

  insertCards(cards) {
    for (let i = 0; i < cards.length; i++) {
      this.cards.push(cards[i]);
    }

    shuffle.call(this);
  }

  isEmpty() {
    return this.cards.length === 0;
  }

  isLastCard() {
    return this.cards.length === 1;
  }

  copyState() {
    return {
      cards: this.cards.slice()
    };
  }
};
