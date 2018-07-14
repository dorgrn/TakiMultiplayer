import React from "react";
import "../css/styleStatsMenu.css";
import manager from "../engine/Manager";

const StatsBoard = props => {
  function handleQuit() {
    manager.gameEnded();
    props.cbHandleQuit();
  }

  function renderNextButton() {
    return (
      <button
        className="stats-button button-UI"
        id={"next-button"}
        onClick={props.cbHandleNextHistory}
      >
        Next
      </button>
    );
  }

  function renderPrevButton() {
    return (
      <button
        className="stats-button button-UI"
        id={"prev-button"}
        onClick={props.cbHandlePrevHistory}
      >
        Prev
      </button>
    );
  }

  function renderResButtons() {
    return (
      <button
        className="stats-button button-UI"
        id={"quit-button"}
        onClick={handleQuit}
      >
        {props.inShowMode ? "Results" : "Quit"}
      </button>
    );
  }

  let statsPlayer = props.activePlayer.stats;
  let turnIndicator =
    props.activePlayer.type === "user" ? "Your turn" : "PC turn";

  return (
    <div className="stats">
      <img src="../src/textures/board.png" id="stats-board" />
      <div className="stats-board-content">
        <div className="stats-text">
          {turnIndicator}
          <br />
          Last card: {statsPlayer.lastCardCounter}
          <br />
          Avg turn time: {statsPlayer.turnsAvgTime}
        </div>
        {renderResButtons()}
        {props.inShowMode ? renderPrevButton() : null}
        {props.inShowMode ? renderNextButton() : null}
      </div>
    </div>
  );
};

export default StatsBoard;
