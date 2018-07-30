import React from "react";
import "../../../../css/gameRoom/player.css";

export default class Player extends React.Component {
  constructor() {
    super();
  }

    createCard(card) {
        const activePlayer = props.game.getActivePlayer();
        let cardStyle = "card-hand";

        if (activePlayer.isUser() && activePlayer.id===props.id) {
            if (props.game.isCardLegal(currentCard)) {
                cardStyle = cardStyle+" legal-card";
            } else {
                cardStyle = cardStyle+" illegal-card";
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
                style={{zIndex: zIndex}}
                leftOffset={leftOffset}
                cardStyle={cardStyle}
                frontImg={currentCard.frontImg}
                onClick={handleClick.bind(this)}
            />
        );
    }


  render() {
    const direction = this.props.direction;
    return (
      <div className={`player-${direction}`}>
          <div className={`hand-${direction}`}>
          </div>

          <div className={"player-headline"}>
              <div className={"player-icon"}>
                  <img className={"player-icon-img"} src={"./textures/user_icon.png"} />
              </div>
              <div className={"player-name"}>
                  {this.props.player.name}
              </div>
          </div>
      </div>
    );
  }
}
