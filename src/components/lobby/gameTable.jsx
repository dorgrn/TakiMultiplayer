import React from "react";
import "../../css/lobby/lobby.css";
import GameTableRow from "./gameTableRow.jsx";

export default class GameTable extends React.Component {
  constructor(props) {
    super(props);
  }

  renderGameRows() {
    const games = this.props.games;
    let res = [];

    for (let gameName in games) {
      if (games.hasOwnProperty(gameName)) {
        let gameRecord = games[gameName];
        res.push(
          <GameTableRow
            key={gameName + "_row"}
            gameRecord={gameRecord}
            user={this.props.user}
          />
        );
      }
    }

    return res;
  }

  render() {
    return (
      <table className={"lobby-table games"}>
        <tbody>
          <tr key={"head games"}>
            <th key={"head-game"}>Game</th>
            <th key={"head-part"}>Participants</th>
            <th key={"head-join"}>Join</th>
            <th key={"head-delete"}>Delete</th>
            <th key={"head-creator"}>Creator</th>
            <th key={"head-status"}>Status</th>
          </tr>
          {this.renderGameRows()}
        </tbody>
      </table>
    );
  }
}
