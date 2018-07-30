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
            <PlayerHorizontal player={this.props.player}/>
        </div>
    );
  }
}
