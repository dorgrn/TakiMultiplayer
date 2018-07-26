import cardFactory from "./CardFactory";

export default class Card{
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
        return this.type === cardFactory.getTypes().VALUE;
    }

    isSpecialCard() {
        return cardFactory.specialTypes.indexOf(this.type) !== -1;
    }

    isSuperCard() {
        return cardFactory.superCards.indexOf(this.type) !== -1;
    }

    compareColor(card) {
        return this.color === card.color;
    }

    compareValue(card) {
        return (
            this.type === cardFactory.getTypes().VALUE &&
            card.type === cardFactory.getTypes().VALUE &&
            this.value === card.value
        );
    }

    compareType(card) {
        return this.type === card.type;
    }

}
