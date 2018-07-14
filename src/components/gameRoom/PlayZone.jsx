import React from "react";
import Card from "./Card.jsx";
import CloseTakiButton from "./CloseTakiButton.jsx";
import manager from "../engine/Manager.js";

export default class PlayZone extends React.Component {
  constructor(props) {
    super(props);
    this.angleCache = [];
  }

  static getCardAngle() {
    const sign = Math.random() > 0.5 ? 1 : -1;
    const angleAbs = Math.random() * 20;
    return angleAbs * sign;
  }

  static checkTakiMode() {
    let activePlayer = manager.getActivePlayer();
    return (
      activePlayer.inTakiMode.status === true &&
      activePlayer.playerType === "user"
    );
  }

  static closeTaki() {
    PlayZone.closeTaki();
  }

  renderPlayZoneCard(card, angle) {
    return (
      <Card
        key={card.cardId}
        holder={"playZone"}
        cardStyle={"card-playZone"}
        frontImg={card.frontImg}
        rotate={angle}
        inShowMode={this.props.inShowMode}
      />
    );
  }

  render() {
    const cardsWithAngle = [];
    const playZoneCards = this.props.playZone.cards;
    const cardsDiff = playZoneCards.length - this.angleCache.length;
    const isInTakiMode = PlayZone.checkTakiMode();

    // There are more playZone cards than angles
    for (let i = 0; i < cardsDiff; i++) {
      this.angleCache.push(PlayZone.getCardAngle());
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
      <div className={"playZone"} id={"playZone"}>
        {isInTakiMode ? (
          <CloseTakiButton onClick={() => PlayZone.closeTaki()} />
        ) : null}
        {cardsWithAngle}
      </div>
    );
  }
}
