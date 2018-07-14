import React from "react";
import "../css/style.css";
import manager from "../engine/Manager";
import stats from "../engine/Stats";

const EndGameMenu = props => {
  function buildTableValues() {
    const players = props.board.players;
    const tableValues = [];
    for (let i = 0; i < players.length; i++) {
      let column = {
        headline: players[i].type,
        avg: players[i].stats.turnsAvgTime,
        avgAll: players[i].stats.turnsAvgTimeAllGames,
        last: players[i].stats.lastCardCounter
      };
      tableValues.push(column);
    }
    return tableValues;
  }

  function makeTableCell(column, value) {
    let key = column.headline + "_" + value + "_" + stats.gamesAmount;
    return <td key={key}>{value}</td>;
  }

  function handleClickReplay() {
    props.cbRestartGame();
  }

  function handleClickShowGame() {
    props.cbShowGame();
  }

  const winner = props.quit
    ? manager.getNextPlayer()
    : manager.getActivePlayer();
  const winnerHeadline = winner.playerType === "user" ? "You win!" : "PC wins!";
  const gameTime = "Game time: " + stats.gameWatch.getElapsedTime();
  const tableValues = buildTableValues();

  return (
    <div className={"menu-background"}>
      <div className={"menu-content"}>
        <h2>Game over</h2>
        <h2>{winnerHeadline}</h2>
        <p>{gameTime}</p>
        <table id={"statsTable"}>
          <thead>
            <tr>
              <td />
              {tableValues.map(column =>
                makeTableCell(column, column.headline)
              )}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Average time per turn (this game):</td>
              {tableValues.map(column => makeTableCell(column, column.avg))}
            </tr>
            <tr>
              <td>Average time per turn (all games):</td>
              {tableValues.map(column => makeTableCell(column, column.avgAll))}
            </tr>
            <tr>
              <td>Last card counter:</td>
              {tableValues.map(column => makeTableCell(column, column.last))}
            </tr>
          </tbody>
        </table>
        <div
          className={"button-UI"}
          id={"play-again-button"}
          onClick={handleClickReplay}
        >
          Play again!
        </div>
        <div
          className={"button-UI"}
          id={"show-game-button"}
          onClick={handleClickShowGame}
        >
          Show game
        </div>
      </div>
    </div>
  );
};

export default EndGameMenu;
