import React from "react";
import Player from "./player.jsx";
import "../../../../css/gameRoom/board.css";

export default class PlayerUp extends React.Component {
  constructor() {
    super();
    this.side="up";
    this.direction = "horizontal";
  }

  render() {
    return (
        <div className={"player"} id={"player-up"}>
            <Player
                user={this.props.user}
                side={this.side}
                direction={this.direction}
                player={this.props.player}
                playerTurnName={this.props.playerTurnName}
            />
        </div>
    );
  }
}
