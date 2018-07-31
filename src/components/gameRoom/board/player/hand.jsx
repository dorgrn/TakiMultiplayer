import React from "react";
import "../../../../css/gameRoom/player.css";
import Card from "../card.jsx";

export default class Hand extends React.Component {
  constructor() {
    super();
    this.handWidth = 29;
    this.cardWidth = 6;
    this.leftStart = 44;
    this.topStart = 30;
    this.leftOffset = 0;
    this.topOffset = 0;
    this.zIndex = 0;
    this.cardCounter = 0;
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
    let rotate;

    if (this.props.direction === "vertical"){
        rotate = -90;
    }

    if (cardLogic !== undefined){
        if (this.props.user.name === this.props.player.name
            && this.props.player.name === this.props.playerTurnName) {
            if (this.isCardLegal(cardLogic)) {
                cardStyle = cardStyle+" legal-card";
            } else {
                cardStyle = cardStyle+" illegal-card";
            }
        }
    }

    key = `${this.props.player.name}`+`${this.cardCounter}`;
      this.cardCounter++;
    const handleClick = function() {
        this.cardSelected(cardLogic);
    };

    return (
        <Card
            key={key}
            card={cardLogic}
            cardStyle={cardStyle}
            style={{zIndex: this.zIndex}}
            rotate={rotate}
            leftOffset={this.leftOffset}
            topOffset={this.topOffset}
            direction={this.props.direction}
            onClick={handleClick.bind(this)}
        />
    );
  }


  render() {
      const direction = this.props.direction;
      const cards = [];
      const cardsAmount = this.props.player.cardsAmount;

      if (this.props.player.name === this.props.user.name){
          this.leftStart = 30;
          this.handWidth = 57;
      }

      this.leftOffset = cardsAmount < this.handWidth/this.cardWidth ?
          this.leftStart + this.handWidth/2 - (this.cardWidth/2)*cardsAmount
          : this.leftStart;
      this.topOffset = cardsAmount < this.handWidth/this.cardWidth ?
          this.topStart + this.handWidth/2 - (this.cardWidth/2)*cardsAmount
          : this.topStart;


      for (let i =0; i<cardsAmount;i++){
          const newCard = this.props.player.hand ?
              this.createCard(this.props.player.hand.cards[i])
              : this.createCard();
          this.zIndex++;
          this.leftOffset += cardsAmount < this.handWidth/this.cardWidth ?
              this.cardWidth
              : this.handWidth/cardsAmount;
          this.topOffset += cardsAmount < this.handWidth/this.cardWidth ?
              this.cardWidth
              : this.handWidth/cardsAmount;
          cards.push(newCard);
      }
    this.zIndex = 0;
    this.cardCounter=0;

    return (
        <div className={`hand-${direction}`}>
            <div className={"hand"}>
                {cards}
            </div>
        </div>
    );
  }
}
