import React from "react";
import "../../css/lobby.css";

export default class GameTable extends React.Component {
  constructor(props) {
    super(props);
  }

  isGameAuthor(gameRecord) {
    return this.props.currentUser.name === gameRecord.authorName.name;
  }

  renderGameRows() {
    const games = this.props.games;
    let res = [];

    for (let gameName in games) {
      if (games.hasOwnProperty(gameName)) {
        let gameRecord = games[gameName];
        res.push(
          <tr key={gameRecord.gameName}>
            <td key={gameRecord.gameName + "_name"}>{gameRecord.gameName}</td>
            <td key={gameRecord.gameName + "_partAmount"}>
              {gameRecord.partAmount}
            </td>
            {this.renderJoin(gameRecord)}
            {this.renderDelete(gameRecord)}
            <td key={gameRecord.gameName + "_author"}>
              {gameRecord.authorName.name}
            </td>
          </tr>
        );
      }
    }

    return res;
  }

  renderJoin(gameRecord) {
    return (
      <td key={gameRecord.gameName + "_join"}>
        <div
          onClick={void 0}
          className={this.isGameAuthor(gameRecord) ? "linkStyle" : ""}
        >
          {gameRecord.authorName.name !== this.props.currentUser ? "Join" : "-"}
        </div>
      </td>
    );
  }

  renderDelete(gameRecord) {
    return (
      <td key={gameRecord.gameName + "_delete"}>
        <div
          onClick={
            this.isGameAuthor(gameRecord)
              ? this.props.deleteGameHandler.bind(this, gameRecord)
              : void 0
          }
          className={this.isGameAuthor(gameRecord) ? "linkStyle" : ""}
        >
          {gameRecord.authorName.name === this.props.currentUser.name
            ? "Delete"
            : "-"}
        </div>
      </td>
    );
  }

  render() {
    return (
      <table className={"lobby-table games"}>
        <tbody>
          <tr key={"head"}>
            <th>Game</th>
            <th>Participants</th>
            <th>Join</th>
            <th>Delete</th>
            <th>Author</th>
          </tr>
          {this.renderGameRows()}
        </tbody>
      </table>
    );
  }
}
