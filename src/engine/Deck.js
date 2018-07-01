import cardFactory from "../engine/CardFactory.js";
const takiDeck = (function() {
  // from https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
  function shuffle() {
    let j, x, i;
    const cards = takiDeck.cards;
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

  return {
    VALUE_CARDS: 2,
    SPECIAL_CARDS: 2,
    SUPER_CARDS: 4,

    cards: [],

    createDeck: function() {
      let cardIdCounter = 1;
      let newCard;

      takiDeck.clearDeck();

      // value cards
      cardFactory.values.forEach(function(value) {
        for (let i = 0; i < takiDeck.VALUE_CARDS; i++) {
          cardFactory.colors.forEach(function(color) {
            newCard = cardFactory.createCard(
              cardIdCounter++,
              color,
              "value",
              getFilename(value, color),
              value
            );
            takiDeck.insertCard(newCard);
          });
        }
      });

      // special cards
      cardFactory.specialTypes.forEach(function(type) {
        for (let i = 0; i < takiDeck.SPECIAL_CARDS; i++) {
          cardFactory.colors.forEach(function(color) {
            newCard = cardFactory.createCard(
              cardIdCounter++,
              color,
              type,
              getFilename(type, color)
            );
            takiDeck.insertCard(newCard);
          });
        }
      });

      // supercards
      cardFactory.superCards.forEach(function(type) {
        for (let i = 0; i < takiDeck.SUPER_CARDS; i++) {
          newCard = cardFactory.createCard(
            cardIdCounter++,
            "colorful",
            type,
            getFilename(type, "colorful")
          );
          takiDeck.insertCard(newCard);
        }
      });

      shuffle();
    },

    insertCard: function(card) {
      const randomIndex = Math.floor(Math.random() * takiDeck.cards.length);
      takiDeck.cards.splice(randomIndex, 0, card);
    },

    insertCards: function(cards) {
      takiDeck.cards.push(cards);
      shuffle();
    },

    draw: function() {
      return takiDeck.cards.pop();
    },

    isEmpty: function() {
      return takiDeck.cards.length === 0;
    },

    isLastCard: function() {
      return takiDeck.cards.length === 1;
    },

    clearDeck: function() {
      takiDeck.cards = [];
    },

    copyState: function(){
      return {
        cards: takiDeck.cards.slice()
      };
    }
  };
})();

export default takiDeck;
