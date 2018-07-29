const Card = require("./Card");

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

function createCard(_cardId, _color, _type, _sourceImg, value) {
    const card = new Card(_cardId, _color, _type, _sourceImg, value);

    // Append card function and description
    switch (_type) {
        case TYPES.VALUE:
            card.value = value;
            card.description = value;
            break;
        case TYPES.TAKI:
            card.description =
                'Play as many cards as you want in the Taki color and press "Close Taki"';
            break;
        case TYPES.CHANGE:
            card.description =
                "Choose the color of the cards the next player plays";
            break;
        case TYPES.TAKE2:
            card.description = "The next player will have to pick up two cards";
            break;
        case TYPES.STOP:
            card.description = "Stop next player from playing";
            break;
        case TYPES.PLUS:
            card.description =
                "After playing this, play another card with this same color";
            break;
        case TYPES.SUPER_TAKI:
            card.description =
                'Play as many cards as you want, in the color of your choice, and press "Close Taki"';
            break;
    }
    return card;
}

function findCardInArray(array, type, color, value) {
    return array.find(function(card) {
        return (
            (type ? card.type === type : true) &&
            (color ? card.color === color : true) &&
            (value ? card.value === value : true)
        );
    });
}


module.exports = {
    TYPES,
    COLORS,
    VALUES,
    SPECIAL_CARDS,
    SUPER_CARDS,
    createCard,
    findCardInArray
};

/*
module.exports = class CardFactory {
  constructor(){
  }

  static get TYPES(){
    return {
        VALUE: "value",
        TAKI: "taki",
        CHANGE: "change",
        STOP: "stop",
        PLUS: "plus",
        TAKE2: "take2",
        REVERSE: "reverse",
        SUPER_TAKI: "superTaki"
    };
  }

  static get COLORS(){
    return ["blue", "green", "red", "yellow"];
  }

  static get VALUES(){
    return [1, 3, 4, 5, 6, 7, 8, 9];
  }

  static get SPECIAL_CARDS(){
    return [this.TYPES.TAKI, this.TYPES.STOP, this.TYPES.PLUS, this.TYPES.TAKE2, this.TYPES.REVERSE];
  }

  static get SUPER_CARDS(){
    return [this.TYPES.CHANGE, this.TYPES.SUPER_TAKI];
  }


  static createCard(_cardId, _color, _type, _sourceImg, value) {
      const card = new Card(_cardId, _color, _type, _sourceImg, value);

      // Append card function and description
      switch (_type) {
          case this.TYPES.VALUE:
              card.value = value;
              card.description = value;
              break;
          case this.TYPES.TAKI:
              card.description =
                  'Play as many cards as you want in the Taki color and press "Close Taki"';
              break;
          case this.TYPES.CHANGE:
              card.description =
                  "Choose the color of the cards the next player plays";
              break;
          case this.TYPES.TAKE2:
              card.description = "The next player will have to pick up two cards";
              break;
          case this.TYPES.STOP:
              card.description = "Stop next player from playing";
              break;
          case this.TYPES.PLUS:
              card.description =
                  "After playing this, play another card with this same color";
              break;
          case this.TYPES.SUPER_TAKI:
              card.description =
                  'Play as many cards as you want, in the color of your choice, and press "Close Taki"';
              break;
      }
      return card;
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
*/