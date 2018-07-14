import React from "react";
import "../../css/lobby.css";

export default class GameTableRow extends React.Component {
  constructor(props) {
    super(props);

    this.gameRecord = props.gameRecord;
    this.isGameCreator =
      props.currentUser.name === props.gameRecord.creator.name;
    this.playersAmount = props.gameRecord.players.length;
    console.log(this.props.deleteGameHandler);
  }

  shouldShowDelete() {
    return this.isGameCreator && this.playersAmount === 1;
  }

  shouldShowJoin() {
    return (
      !this.isGameCreator &&
      this.playersAmount < props.gameRecord.players.length
    );
  }

  renderJoin() {
    let label = "-";
    let onClick = null;
    let className = "";

    if (this.shouldShowJoin()) {
      label = "Join";
      onClick = this.props.joinGameHandler.bind(this, this.gameRecord);
      className = "linkStyle";
    }

    return (
      <td key={this.gameRecord.name + "_join"}>
        <div onClick={onClick} className={className}>
          {label}
        </div>
      </td>
    );
  }

  renderDelete() {
    let label = "-";
    let onClick = null;
    let className = "";

    if (this.shouldShowDelete()) {
      label = "Delete";
      onClick = this.props.deleteGameHandler.bind(this, this.gameRecord);
      className = "linkStyle";
    }

    return (
      <td key={this.gameRecord.name + "_delete"}>
        <div onClick={onClick} className={className}>
          {label}
        </div>
      </td>
    );
  }

  getGameStatus(gameRecord) {
    return gameRecord.playerLimit - gameRecord.players.length === 0
      ? "active"
      : "pending";
  }

  render() {
    const gameRecord = this.props.gameRecord;
    return (
      <tr key={gameRecord.name}>
        <td key={gameRecord.name + "_name"}>{gameRecord.name}</td>
        <td key={gameRecord.name + "_players"}>
          {gameRecord.players.length + "/" + gameRecord.playerLimit}
        </td>
        {this.renderJoin(gameRecord)}
        {this.renderDelete(gameRecord)}
        <td key={gameRecord.name + "_creator"}>{gameRecord.creator.name}</td>
        <td key={gameRecord.name + "_status"}>
          {this.getGameStatus(gameRecord)}
        </td>
      </tr>
    );
  }
}
