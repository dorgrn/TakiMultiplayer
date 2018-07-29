const CardFactory = require("./CardFactory.js");


module.exports = class Card {
  constructor(cardId, color, type, frontImg, value) {
    this.cardId = cardId;
    this.type = type;
    this.color = color;
    this.frontImg = frontImg;
    this.backImg = "card_back";
    this.description = "";
    this.value = value;
  }

  isValueCard() {
    return this.type === CardFactory.TYPES.VALUE;
  }

  isSpecialCard() {
    return CardFactory.SPECIAL_CARDS.indexOf(this.type) !== -1;
  }

  isSuperCard() {
    console.log(CardFactory.SUPER_CARDS);
    return CardFactory.SUPER_CARDS.indexOf(this.type) !== -1;
  }

  compareColor(card) {
    return this.color === card.color;
  }

  compareValue(card) {
    return (
      this.type === CardFactory.TYPES.VALUE &&
      card.type === CardFactory.TYPES.VALUE &&
      this.value === card.value
    );
  }

  compareType(card) {
    return this.type === card.type;
  }
};
