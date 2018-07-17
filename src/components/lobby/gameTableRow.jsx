import React from "react";
import "../../css/lobby.css";

export default class GameTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.isGameCreator =
      props.currentUser.name === props.gameRecord.creator.name;
  }

  shouldShowDelete() {
    const playerAmount = this.props.gameRecord.players.length;
    console.log("should show delete:", this.isGameCreator, playerAmount);
    return this.isGameCreator && _.eq(playerAmount, 1);
  }

  shouldShowJoin() {
    const gameRecord = this.props.gameRecord;
    return (
      !this.isGameCreator &&
      gameRecord.players.length < parseInt(gameRecord.playerLimit)
    );
  }

  renderJoin() {
    let label = "-";
    let onClick = null;
    let className = "";
    const gameRecord = this.props.gameRecord;

    if (this.shouldShowJoin()) {
      label = "Join";
      onClick = this.props.joinGameHandler.bind(this, gameRecord);
      className = "linkStyle";
    }

    return (
      <td key={gameRecord.name + "_join"}>
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
    const gameRecord = this.props.gameRecord;

    if (this.shouldShowDelete()) {
      label = "Delete";
      onClick = this.props.deleteGameHandler.bind(this, gameRecord);
      className = "linkStyle";
    }

    return (
      <td key={gameRecord.name + "_delete"}>
        <div onClick={onClick} className={className}>
          {label}
        </div>
      </td>
    );
  }

  static getGameStatus(gameRecord) {
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
          {GameTableRow.getGameStatus(gameRecord)}
        </td>
      </tr>
    );
  }
}
