function removeCardInArray(array, card){
    let i;
    for (i = 0; i < array.length; i++) {
        if (card.cardId === array[i].cardId) {
            array.splice(i, 1);
            break;
        }
    }
}

export default class Hand {
    constructor() {
        this.cards = [];
        this.legalCards = [];
    }

    init() {
        this.cards = [];
        this.legalCards = [];
    }

    removeCard(card) {
        removeCardInArray(this.cards, card);
        removeCardInArray(this.legalCards, card);
    }

    getCardById(cardId) {
        for (let i = 0; i < this.cards.length; i++) {
            if (cardId === this.cards[i].cardId) {
                return this.cards[i];
            }
        }
    }

    copyState() {
        return {
            cards: this.cards.slice(),
            legalCards: this.legalCards.slice()
        };
    }
}