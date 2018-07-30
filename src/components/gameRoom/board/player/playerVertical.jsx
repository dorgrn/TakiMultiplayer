import React from "react";
import Player from "./player.jsx";

export default class PlayerVertical extends React.Component {
  constructor() {
    super();
    this.direction = "vertical";
  }

  render() {
    return (
      <Player user={this.props.user} player={this.props.player} playerTurnName={this.props.playerTurnName} direction={this.direction}/>
    );
  }
}
