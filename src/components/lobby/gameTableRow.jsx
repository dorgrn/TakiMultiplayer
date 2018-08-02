import React from "react";
import "../../css/lobby/lobby.css";

const gameUtils = require("../../utils/gameUtils.js");

export default class GameTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.isGameCreator = props.user.name === props.gameRecord.creator.name;
  }

  deleteGameHandler(gameRecord) {
    fetch("/games/deleteGame", {
      method: "POST",
      body: JSON.stringify({
        gameName: gameRecord.name,
        creator: gameRecord.creator.name
      }),
      credentials: "include"
    })
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        this.props.updateViewManager();
      })
      .catch(err => {
        throw err;
      });
  }

  joinGameHandler(gameRecord) {
    fetch("/games/joinGame", {
      method: "POST",
      body: JSON.stringify({
        gameName: gameRecord.name
      }),
      credentials: "include"
    })
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        this.props.updateViewManager();
      })
      .catch(err => {
        throw err;
      });
  }

  shouldShowDelete() {
    const playerAmount = this.props.gameRecord.players.length;
    return this.isGameCreator && _.eq(playerAmount, 1);
  }

  shouldShowJoin() {
    return (
      !this.isGameCreator &&
      this.props.user.gameName !== this.props.gameRecord.name
    );
  }

  renderJoin() {
    let label = "-";
    let onClick = null;
    let className = "";
    const gameRecord = this.props.gameRecord;

    if (this.shouldShowJoin()) {
      label = "Join";
      onClick = this.joinGameHandler.bind(this, gameRecord);
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
      onClick = this.deleteGameHandler.bind(this, gameRecord);
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
