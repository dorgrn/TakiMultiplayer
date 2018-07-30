import React from "react";
import Player from "./player.jsx";

export default class PlayerHorizontal extends React.Component {
  constructor() {
    super();
    this.direction = "horizontal";
  }

  render() {
    return (
      <Player player={this.props.player} direction={this.direction}/>
    );
  }
}
