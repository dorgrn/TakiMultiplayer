import React from "react";
import Player from "./player.jsx";

export default class PlayerVertical extends React.Component {
  constructor() {
    super();
    this.direction = "vertical";
  }

  render() {
    return (
      <Player player={this.props.player} direction={this.direction}/>
    );
  }
}
