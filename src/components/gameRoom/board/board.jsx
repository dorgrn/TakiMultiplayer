import React from "react";
import PlayerUp from "./player/playerUp.jsx";
import PlayerDown from "./player/playerDown.jsx";
import PlayerLeft from "./player/playerLeft.jsx";
import PlayerRight from "./player/playerRight.jsx";


import "../../../css/gameRoom/board.css";


export default class Board extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className={"board-content"}>
          <div className={"board-layout"}>
            <PlayerDown player={this.props.boardState.players[0]}/>
            <PlayerLeft player={this.props.boardState.players[1]}/>
            <PlayerUp player={this.props.boardState.players[2]}/>
          </div>
      </div>
    );
  }
}
