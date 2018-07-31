import React from "react";
import PlayerUp from "./player/playerUp.jsx";
import PlayerDown from "./player/playerDown.jsx";
import PlayerLeft from "./player/playerLeft.jsx";
import PlayerRight from "./player/playerRight.jsx";
import CenterBoard from "./center/centerBoard.jsx";
import ColorMenu from "./colorMenu.jsx";
import "../../../css/gameRoom/board.css";


export default class Board extends React.Component {
  constructor() {
    super();
  }

  renderColorMenu(){
      const boardState = this.props.boardState;
      const amount = boardState.playZone.cards.length;

      if (boardState.playZone.cards[amount-1].color === 'colorful'){
        return <ColorMenu/>;
      }

      return null;
  }

  renderPlayers(){
    const boardState = this.props.boardState;
    const players = [];
    if (boardState.players.length === 2){
        players.push(<PlayerDown key={boardState.players[0].name} user={this.props.user} player={boardState.players[0]} playerTurnName={boardState.playerTurnName}/>);
        players.push(<PlayerUp key={boardState.players[1].name} user={this.props.user} player={boardState.players[1]} playerTurnName={boardState.playerTurnName}/>);
    }
    else if(boardState.players.length === 3){
        players.push(<PlayerDown key={boardState.players[0].name} user={this.props.user} player={boardState.players[0]} playerTurnName={boardState.playerTurnName}/>);
        players.push(<PlayerLeft key={boardState.players[1].name} user={this.props.user} player={boardState.players[1]} playerTurnName={boardState.playerTurnName}/>);
        players.push(<PlayerUp key={boardState.players[2].name} user={this.props.user} player={boardState.players[2]} playerTurnName={boardState.playerTurnName}/>);
    }
    else {
        players.push(<PlayerDown key={boardState.players[0].name} user={this.props.user} player={boardState.players[0]} playerTurnName={boardState.playerTurnName}/>);
        players.push(<PlayerLeft key={boardState.players[1].name} user={this.props.user} player={boardState.players[1]} playerTurnName={boardState.playerTurnName}/>);
        players.push(<PlayerUp key={boardState.players[2].name} user={this.props.user} player={boardState.players[2]} playerTurnName={boardState.playerTurnName}/>);
        players.push(<PlayerRight key={boardState.players[3].name} user={this.props.user} player={boardState.players[3]} playerTurnName={boardState.playerTurnName}/>);
    }

    return players;
  }

  render() {
    const players = this.renderPlayers();
    return (
      <div className={"board-content"}>
          <div className={"board-layout"}>
              {players}
              <CenterBoard user={this.props.user} boardState={this.props.boardState}/>
          </div>
          {this.renderColorMenu()}
      </div>
    );
  }
}
