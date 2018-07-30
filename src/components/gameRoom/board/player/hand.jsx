import React from "react";
import "../../../../css/gameRoom/player.css";
import Card from "../card.jsx";

const handWidth = 29;
const cardWidth = 6;
const leftStart = 44;
let leftOffset = 0;
let topOffset = 0;
let zIndex = 0;
let cardCounter = 0;

export default class Hand extends React.Component {
  constructor() {
    super();
  }

playCard(card){
    fetch("/gameRoom/playCard", {method: "POST",body: JSON.stringify(card),credentials: "include"})
        .then(response => {
            if (!response.ok) {
                console.log(
                    `user ${this.props.user.name} failed to play card`,
                    response
                );
            }
        });
}

  cardSelected(card) {
    //request from server to playCard
    if (card !== undefined){
        console.log(card);
        this.playCard(card);
    }
  }

  isCardLegal(card){
      const legalCards = this.props.player.hand.legalCards;
      for(let i=0;i<legalCards.length;i++){
          if (card.cardId === legalCards[i].cardId){
              return true;
          }
      }

      return false;
  }

  createCard(cardLogic) {
    let cardStyle = "card";
    let key;

    if (cardLogic !== undefined){
        if (this.props.user.name === this.props.player.name
            && this.props.player.name === this.props.playerTurnName) {
            if (this.isCardLegal(cardLogic)) {
                cardStyle = cardStyle+" legal-card";
            } else {
                cardStyle = cardStyle+" illegal-card";
            }
            key = cardLogic.cardId;
        }
    }
    else {
        key = `${this.props.player.name}`+`${cardCounter}`;
        cardCounter++;
    }

    const handleClick = function() {
      this.cardSelected(cardLogic);
    };

    return (
        <Card
            key={key}
            card={cardLogic}
            cardStyle={cardStyle}
            style={{zIndex: zIndex}}
            leftOffset={leftOffset}
            topOffset={topOffset}
            direction={this.props.direction}
            onClick={handleClick.bind(this)}
        />
    );
  }


  render() {
    const direction = this.props.direction;
    const cards = [];
    const cardsAmount = this.props.player.cardsAmount;

    leftOffset = cardsAmount < handWidth/cardWidth ?
        leftStart + handWidth/2 - (cardWidth/2)*cardsAmount
        : leftStart;


    for (let i =0; i<cardsAmount;i++){
        const newCard = this.props.player.hand ?
            this.createCard(this.props.player.hand.cards[i])
            : this.createCard();
        zIndex++;
        leftOffset += cardsAmount < handWidth/cardWidth ?
            cardWidth
            : handWidth/cardsAmount;
        cards.push(newCard);
    }
    zIndex = 0;
    cardCounter=0;

    return (
        <div className={`hand-${direction}`}>{cards}</div>
    );
  }
}
