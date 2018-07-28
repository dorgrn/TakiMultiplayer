const Card = require("./Card");

module.exports = (function() {
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

  return {
    colors: ["blue", "green", "red", "yellow"],
    values: [1, 3, 4, 5, 6, 7, 8, 9],
    specialTypes: ["taki", "stop", "plus", "take2", "reverse"],
    superCards: ["change", "superTaki"],

    createCard: function(_cardId, _color, _type, _sourceImg, value) {
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
    },

    getTypes: function() {
      return TYPES;
    },

    findCardInArray: function(array, type, color, value) {
      return array.find(function(card) {
        return (
          (type ? card.type === type : true) &&
          (color ? card.color === color : true) &&
          (value ? card.value === value : true)
        );
      });
    }
  };
})();
