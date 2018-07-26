import React from "react";
import manager from "../engine/Manager.js";

const Deck = props => {
  const backCardImgSrc = "../src/textures/cards/card_back.png";

  function getCardStyle() {
    let res = "card-deck";
    const activePlayer = manager.getActivePlayer();

    if (!props.inShowMode && activePlayer.playerType === "user") {
      if (activePlayer.isAbleToDrawFromDeck()) {
        res += " legal-card";
      } else {
        res += " illegal-card";
      }
    }

    res += " tooltip";
    return res;
  }

  function handleClick() {
    manager.getActivePlayer().drawWhenNoLegalCards();
  }

  return (
    <div className={"deck"}>
      <img
        className={getCardStyle()}
        src={backCardImgSrc}
        onClick={props.inShowMode ? null : handleClick}
      />
    </div>
  );
};

export default Deck;
