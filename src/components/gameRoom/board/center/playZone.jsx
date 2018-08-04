import React from "react";
import Card from "../card.jsx";
import "../../../../css/gameRoom/board.css";


export default class PlayZone extends React.Component {
  constructor() {
    super();
    this.angleCache = [];
  }

  getCardAngle() {
      const sign = Math.random() > 0.5 ? 1 : -1;
      const angleAbs = Math.random() * 20;

      return angleAbs * sign;
  }

  renderPlayZoneCard(card, angle) {
      return (
          <Card
              key={card.cardId}
              card={card}
              cardStyle={"card"}
              rotate={angle}
          />
      );
  }


  render() {
      const cardsWithAngle = [];
      const playZoneCards = this.props.playZone.cards;
      const cardsDiff = playZoneCards.length - this.angleCache.length;

      // There are more playZone cards than angles
      for (let i = 0; i < cardsDiff; i++) {
          this.angleCache.push(this.getCardAngle());
      }

      // There are less playZone cards than angles
      for (let i = 0; i < -cardsDiff; i++) {
          this.angleCache.pop();
      }

      for (let i = 0; i < playZoneCards.length; i++) {
          cardsWithAngle.push(
              this.renderPlayZoneCard(playZoneCards[i], this.angleCache[i])
          );
      }
    return (
      <div className={"playZone"}>
          {cardsWithAngle}
      </div>
    );
  }
}
