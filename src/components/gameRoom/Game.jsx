import React from "react";
import "../css/style.css";
import Board from "./Board";
import StatsBar from "./StatsBar.jsx";
import manager from "../../engine/Manager.js";
import ColorMenu from "./ColorMenu";
import EndGameMenu from "./EndGameMenu.jsx";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.initalState = {
      board: {},
      history: [],
      stepNumber: 0,
      inShowMode: false, // this cancels interactivity and animations
      colorMenuShown: false,
      endMenuShown: false,
      quit: false
    };
    this.state = this.initalState;
    Game.runGame();
  }

  static runGame() {
    manager.create();
    manager.init();
  }

  restartGame() {
    this.setState(() => this.initalState);
    manager.init();
    manager.updateUI();
  }

  showGame() {
    this.setState(() => ({
      endMenuShown: false,
      inShowMode: true
    }));
  }

  componentWillMount() {
    manager.setCBUIUpdateFunction(this.updateUI.bind(this));
    manager.setUIChangeColorFunction(this.toggleColorMenu.bind(this));
    manager.setCBUISaveHistory(this.saveHistory.bind(this));
    manager.setCBUIEndGame(this.endGame.bind(this));
    manager.updateUI();
  }

  componentDidMount(){
    this.saveHistory();
  }

  endGame() {
    this.setState(() => ({ endMenuShown: true }));
  }

  updateUI(boardState) {
    this.setState(() => ({ board: boardState }));
  }

  handleQuit() {
    // we are in show mode: show end game menu
    if (this.state.inShowMode) {
      this.setState(() => ({ endMenuShown: true }));
    } else {
      this.setState(() => ({ quit: true }));
    }
  }

  saveHistory() {
    const boardState = manager.getBoardState();
    this.setState(prevState => ({
      history: [...prevState.history, boardState],
      stepNumber: prevState.stepNumber + 1
    }));
  }

  loadPrevHistory() {
    if (this.state.stepNumber === 0) {
      return;
    }
    this.setState(prevState => ({
      board: prevState.history[prevState.stepNumber - 1],
      stepNumber: prevState.stepNumber - 1
    }));
  }

  loadNextHistory() {
    if (this.state.stepNumber >= this.state.history.length - 1) {
      return;
    }
    this.setState(prevState => ({
      board: prevState.history[prevState.stepNumber + 1],
      stepNumber: prevState.stepNumber + 1
    }));
  }

  toggleColorMenu() {
    this.setState(prevState => ({ colorMenuShown: !prevState.colorMenuShown }));
  }

  renderColorMenu() {
    if (this.state.colorMenuShown) {
      return <ColorMenu onColorSelected={this.toggleColorMenu.bind(this)} />;
    }
    return null;
  }

  handlePrevHistory() {
    this.setState(() => ({ inShowMode: true }));
    this.loadPrevHistory();
  }

  handleNextHistory() {
    this.setState(() => ({ inShowMode: true }));
    this.loadNextHistory();
  }

  render() {
    return (
      <div>
        <StatsBar
          stats={this.state.board.stats}
          inShowMode={this.state.inShowMode}
        />
        <Board
          board={this.state.board}
          cbHandleQuit={this.handleQuit.bind(this)}
          cbHandlePrevHistory={this.handlePrevHistory.bind(this)}
          cbHandleNextHistory={this.handleNextHistory.bind(this)}
          inShowMode={this.state.inShowMode}
        />
        {this.renderColorMenu()}
        {this.state.endMenuShown ? (
          <EndGameMenu
            cbRestartGame={this.restartGame.bind(this)}
            cbShowGame={this.showGame.bind(this)}
            quit={this.state.quit}
            endGame={this.state.endMenuShown}
            board={this.state.board}
          />
        ) : null}
      </div>
    );
  }
}
