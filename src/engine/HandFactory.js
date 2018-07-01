const handFactory = (function() {
  return {
    createHand: function() {
      return {
        cards: [],
        legalCards: [],

        init: function() {
          this.cards = [];
          this.legalCards = [];
        },

        removeCard: function(card) {
          let i;
          for (i = 0; i < this.cards.length; i++) {
            if (card.cardId === this.cards[i].cardId) {
              this.cards.splice(i, 1);
              break;
            }
          }

          for (i = 0; i < this.legalCards.length; i++) {
            if (card.cardId === this.legalCards[i].cardId) {
              this.legalCards.splice(i, 1);
              break;
            }
          }
        },

        getCardById: function(cardId) {
          for (let i = 0; i < this.cards.length; i++) {
            if (cardId === this.cards[i].cardId) {
              return this.cards[i];
            }
          }
        },

        copyState: function(){
          return{
            cards: this.cards.slice(),
            legalCards: this.legalCards.slice()
          };
        }
      };
    }
  };
})();

export default handFactory;
