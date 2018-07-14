import React from "react";
import "../../css/lobby.css";
import GameTableRow from "./gameTableRow.jsx";

export default class GameTable extends React.Component {
  constructor(props) {
    super(props);
  }

  isGameCreator(gameRecord) {
    return this.props.currentUser.name === gameRecord.creator.name;
  }

  renderGameRows() {
    const games = this.props.games;
    let res = [];

    for (let gameName in games) {
      if (games.hasOwnProperty(gameName)) {
        let gameRecord = games[gameName];
        res.push(
          <GameTableRow
            gameRecord={gameRecord}
            deleteGameHandler={this.props.deleteGameHandler}
            currentUser={this.props.currentUser}
          />
        );
      }
    }

    return res;
  }

  renderJoin(gameRecord) {
    return (
      <td key={gameRecord.name + "_join"}>
        <div
          onClick={void 0}
          className={this.isGameCreator(gameRecord) ? "linkStyle" : ""}
        >
          {this.isGameCreator(gameRecord) ? "Join" : "-"}
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
            <th>Creator</th>
            <th>Active</th>
          </tr>
          {this.renderGameRows()}
        </tbody>
      </table>
    );
  }
}
