const cardFactory = (function() {
  const TYPES = {
    VALUE: "value",
    TAKI: "taki",
    CHANGE: "change",
    STOP: "stop",
    PLUS: "plus",
    TAKE2: "take2",
    SUPER_TAKI: "superTaki"
  };

  return {
    colors: ["blue", "green", "red", "yellow"],
    values: [1, 3, 4, 5, 6, 7, 8, 9],
    specialTypes: ["taki", "stop", "plus", "take2"],
    superCards: ["change", "superTaki"],

    //Functions:
    funcOpenTaki: {},
    funcChangeColor: {},
    funcTake2: {},
    funcStop: {},
    funcPlus: {},
    funcSuperTaki: {},

    createCard: function(_cardId, _color, _type, _sourceImg, value) {
      const card = {
        cardId: _cardId,
        type: _type,
        color: _color,
        frontImg: _sourceImg,
        backImg: "card_back",
        description: "",

        isValueCard: function() {
          return this.type === TYPES.VALUE;
        },

        isSpecialCard: function() {
          return cardFactory.specialTypes.indexOf(this.type) !== -1;
        },

        isSuperCard: function() {
          return cardFactory.superCards.indexOf(this.type) !== -1;
        },

        compareColor: function(card) {
          return this.color === card.color;
        },

        compareValue: function(card) {
          return (
            this.type === TYPES.VALUE &&
            card.type === TYPES.VALUE &&
            this.value === card.value
          );
        },

        compareType: function(card) {
          return this.type === card.type;
        }
      };

      // Append card function and description
      switch (_type) {
        case TYPES.VALUE:
          card.value = value;
          card.description = value;
          break;
        case TYPES.TAKI:
          card.activate = cardFactory.funcOpenTaki;
          card.description =
            'Play as many cards as you want in the Taki color and press "Close Taki"';
          break;
        case TYPES.CHANGE:
          card.activate = cardFactory.funcChangeColor;
          card.description =
            'Choose the color of the cards the next player plays';
          break;
        case TYPES.TAKE2:
          card.activate = cardFactory.funcTake2;
          card.description = 'The next player will have to pick up two cards';
          break;
        case TYPES.STOP:
          card.activate = cardFactory.funcStop;
          card.description = 'Stop next player from playing';
          break;
        case TYPES.PLUS:
          card.activate = cardFactory.funcPlus;
          card.description = 'After playing this, play another card with this same color';
          break;
        case TYPES.SUPER_TAKI:
          card.activate = cardFactory.funcSuperTaki;
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

export default cardFactory;
