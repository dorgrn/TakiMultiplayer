import React from "react";
import "../../css/gameRoom/sidebar.css";

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const gameRecord = this.props.gameToShow;
    return (
      <div className={"sidebar"}>
        <section>
          <h3>Game:</h3> {gameRecord.name}
        </section>
        <section>
          <h3>Players</h3>
          <ul className={"sidebar-list"}>
            {gameRecord.players.map(player => (
              <li key={`pl_${player}`}>{player}</li>
            ))}
          </ul>
        </section>
      </div>
    );
  }
}
