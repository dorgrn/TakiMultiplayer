import React from "react";
import Card from "./Card.jsx";
import manager from "../engine/Manager";

const Hand = props => {
  function cardSelected(cardId) {
    const activePlayer = manager.getActivePlayer();
    if (activePlayer.playerType === "user" && props.id === "user") {
      const card = activePlayer.hand.getCardById(cardId);
      activePlayer.playCard(card);
    }
  }

  function createCard(currentCard) {
    const activePlayer = manager.getActivePlayer();
    let cardStyle = "card";
    if (!props.inShowMode) {
      if (activePlayer.playerType === "user" && props.id === "user") {
        if (manager.isCardLegal(currentCard)) {
          cardStyle = "legal-card";
        } else {
          cardStyle = "illegal-card";
        }
      }
    }

    const handleClick = function() {
      cardSelected(currentCard.cardId);
    };

    return (
      <Card
        holder={props.id}
        key={currentCard.cardId}
        description={currentCard.description}
        cardStyle={cardStyle}
        frontImg={currentCard.frontImg}
        onClick={handleClick.bind(this)}
        inShowMode={props.inShowMode}
      />
    );
  }
  const cards = [];
  const propsCards = props.hand.cards;
  for (let i = 0; i < propsCards.length; i++) {
    const newCard = createCard(propsCards[i]);
    cards.push(newCard);
  }

  return <div className="hand board-row">{cards}</div>;
};

export default Hand;
