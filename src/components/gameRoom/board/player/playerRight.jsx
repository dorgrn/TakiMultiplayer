import React from "react";
import Player from "./player.jsx";
import "../../../../css/gameRoom/board.css";

export default class PlayerRight extends React.Component {
  constructor() {
    super();
    this.side="right";
    this.direction = "vertical";
  }

  render() {
    return (
        <div className={"player"} id={"player-right"}>
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
