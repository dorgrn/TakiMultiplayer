import React from "react";
import Player from "./player.jsx";

export default class PlayerHorizontal extends React.Component {
  constructor() {
    super();
    this.direction = "horizontal";
  }

  render() {
    return (
      <Player user={this.props.user} player={this.props.player} playerTurnName={this.props.playerTurnName} direction={this.direction}/>
    );
  }
}
