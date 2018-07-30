import React from "react";
import PlayerUp from "./player/playerUp.jsx";
import PlayerDown from "./player/playerDown.jsx";
import PlayerLeft from "./player/playerLeft.jsx";
import PlayerRight from "./player/playerRight.jsx";
import CenterBoard from "./center/centerBoard.jsx";
import "../../../css/gameRoom/board.css";


export default class Board extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className={"board-content"}>
          <div className={"board-layout"}>
            <PlayerDown user={this.props.user} player={this.props.boardState.players[0]} playerTurnName={this.props.boardState.playerTurnName}/>
            <PlayerUp user={this.props.user} player={this.props.boardState.players[1]} playerTurnName={this.props.boardState.playerTurnName}/>
            <CenterBoard user={this.props.user} boardState={this.props.boardState}/>
          </div>
      </div>
    );
  }
}
