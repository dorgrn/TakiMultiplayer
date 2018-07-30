import React from "react";
import Card from "../card.jsx";
import "../../../../css/gameRoom/board.css";


export default class Deck extends React.Component {
  constructor() {
    super();
  }

  drawCard(){
      fetch("/gameRoom/drawCard", {method: "GET",credentials: "include"})
          .then(response => {
              if (!response.ok) {
                  console.log(
                      `user ${this.props.user.name} failed to draw card`,
                      response
                  );
              }
          });
  }

  createCard() {
      let style = "card";
      const boardState = this.props.boardState;

      if (this.props.user.name === boardState.playerTurnName){
        const player = boardState.players.find(player => player.name === this.props.user.name);
        if (player.hand.legalCards.length === 0){
            style += " legal-card";
        }
        else {
            style += " illegal-card";
        }
      }

      const handleClick = function() {
          this.drawCard();
      };

      return (
          <Card
              cardStyle={style}
              onClick={handleClick.bind(this)}
          />
      );
  }



  render() {
    const card = this.createCard();
    return (
      <div className={"deck"}>
          {card}
      </div>
    );
  }
}
