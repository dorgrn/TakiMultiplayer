import React from "react";
import PlayerVertical from "./playerVertical.jsx";
import "../../../../css/gameRoom/board.css";

export default class PlayerLeft extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
        <div id={"player-left"}>
            <PlayerVertical player={this.props.player}/>
        </div>
    );
  }
}
