const playZone = (function() {
  return {
    cards: [],

    putOnTop: function(card) {
      playZone.cards.push(card);
    },

    popTheTop: function() {
      return playZone.cards.pop();
    },

    getTop: function() {
      return playZone.cards[playZone.cards.length - 1];
    },

    getUsedCards: function() {
      return playZone.cards.splice(0, playZone.cards.length - 1);
    },

    isEmpty: function() {
      return playZone.cards.length === 0;
    },

    copyState: function() {
      return {
        cards: playZone.cards.slice()
      };
    },

    init: function() {
      this.cards = [];
    }
  };
})();

export default playZone;
