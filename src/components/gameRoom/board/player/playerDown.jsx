import React from "react";
import PlayerHorizontal from "./playerHorizontal.jsx";
import "../../../../css/gameRoom/board.css";

export default class PlayerDown extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
        <div id={"player-down"}>
            <PlayerHorizontal user={this.props.user} player={this.props.player} playerTurnName={this.props.playerTurnName}/>
        </div>
    );
  }
}
