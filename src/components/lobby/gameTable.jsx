import React from "react";
import "../../css/lobby/lobby.css";
import "../../css/lobby/gameTable.css";
import GameTableBox from "./gameTableBox.jsx";

export default class GameTable extends React.Component {
  constructor(props) {
    super(props);
  }

  renderGameObjects() {
    const games = this.props.games;
    let gameObjects = [];

    for (let gameName in games){
        if (games.hasOwnProperty(gameName)) {
            let game = games[gameName];
            gameObjects.push(
                <GameTableBox
                    key={"game_table_object_"+game.name}
                    user={this.props.user}
                    game={game}
                    updateViewManager={this.props.updateViewManager}
                />
            );
        }
    }

    return gameObjects;
  }

  render() {
    return (
        <div className={"lobby-column"} id={"games-table"}>
            <h1>Games</h1>
            <div className={"lobby-scrollbar"}>
                {this.renderGameObjects()}
            </div>
        </div>
    );
  }
}
