import React from "react";
import PlayerVertical from "./playerVertical.jsx";
import "../../../../css/gameRoom/board.css";

export default class PlayerRight extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
        <div id={"player-right"}>
            <PlayerVertical user={this.props.user} player={this.props.player} playerTurnName={this.props.playerTurnName}/>
        </div>
    );
  }
}
