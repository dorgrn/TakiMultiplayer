const TYPES = {
    VALUE: "value",
    TAKI: "taki",
    CHANGE: "change",
    STOP: "stop",
    PLUS: "plus",
    TAKE2: "take2",
    REVERSE: "reverse",
    SUPER_TAKI: "superTaki"
};

const COLORS = ["blue", "green", "red", "yellow"];
const VALUES = [1, 3, 4, 5, 6, 7, 8, 9];
const SPECIAL_CARDS = [TYPES.TAKI, TYPES.STOP, TYPES.PLUS, TYPES.TAKE2, TYPES.REVERSE];
const SUPER_CARDS = [TYPES.CHANGE, TYPES.SUPER_TAKI];

function chooseDescription() {
    switch (this.type) {
        case TYPES.VALUE:
            this.description = this.value;
            break;
        case TYPES.TAKI:
            this.description =
                'Play as many cards as you want in the Taki color and press "Close Taki"';
            break;
        case TYPES.CHANGE:
            this.description =
                "Choose the color of the cards the next player plays";
            break;
        case TYPES.TAKE2:
            this.description = "The next player will have to pick up two cards";
            break;
        case TYPES.STOP:
            this.description = "Stop next player from playing";
            break;
        case TYPES.PLUS:
            this.description =
                "After playing this, play another card with this same color";
            break;
        case TYPES.SUPER_TAKI:
            this.description =
                'Play as many cards as you want, in the color of your choice, and press "Close Taki"';
            break;
    }
}

module.exports = class Card {
  constructor(cardId, color, type, frontImg, value) {
    this.cardId = cardId;
    this.type = type;
    this.color = color;
    this.frontImg = frontImg;
    this.backImg = "card_back";
    this.description = "";
    this.value = value;

    chooseDescription.call(this);
  }

  static get TYPES(){
    return TYPES;
  }

  static get COLORS(){
    return COLORS;
  }

  static get VALUES(){
    return VALUES;
  }

  static get SPECIAL_CARDS(){
    return SPECIAL_CARDS;
  }

  static get SUPER_CARDS(){
    return SUPER_CARDS;
  }


  isValueCard() {
    return this.type === TYPES.VALUE;
  }

  isSpecialCard() {
    return SPECIAL_CARDS.indexOf(this.type) !== -1;
  }

  isSuperCard() {
    return SUPER_CARDS.indexOf(this.type) !== -1;
  }

  compareColor(card) {
    return this.color === card.color;
  }

  compareValue(card) {
    return (
      this.type === TYPES.VALUE &&
      card.type === TYPES.VALUE &&
      this.value === card.value
    );
  }

  compareType(card) {
    return this.type === card.type;
  }

  static findCardInArray(array, type, color, value) {
      return array.find(function(card) {
          return (
              (type ? card.type === type : true) &&
              (color ? card.color === color : true) &&
              (value ? card.value === value : true)
          );
      });
  }
};

