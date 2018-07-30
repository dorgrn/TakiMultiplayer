import React from "react";
import PlayerHorizontal from "./playerHorizontal.jsx";
import "../../../../css/gameRoom/board.css";

export default class PlayerUp extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
        <div id={"player-up"}>
            <PlayerHorizontal player={this.props.player}/>
        </div>
    );
  }
}
