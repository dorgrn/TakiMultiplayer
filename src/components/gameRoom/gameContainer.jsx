import React from "react";
import Board from "./board/board.jsx";
import Info from "./info/info.jsx";
import EndGameMenu from "./endGameMenu.jsx";
import ExitButton from "../exitButton.jsx";
import gameUtils from "../../utils/gameUtils.js";
import "../../css/global.css";
import "../../css/gameRoom/gameRoom.css";



export default class GameContainer extends React.Component {
  constructor(props) {
    super(props);
    this.UPDATE_INTERVAL = 500;
    this.state = {
        game: "",
        boardState: ""
    };

    this.fetchGameInterval = setInterval(this.getGame.bind(this), this.UPDATE_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.fetchBoardStateInterval);
    clearInterval(this.fetchGameInterval);
  }

  getGame() {
    return fetch("/games/getGame", { method: "GET", credentials: "include" })
        .then(response => {
            if (!response.ok) {
                throw response;
            }
            return response.json();
        })
        .then(game => {
            this.setState(() => ({ game: game }));
        })
        .then(() => {
            if (this.state.game.status === gameUtils.GAME_CONSTS.IN_PROGRESS && this.fetchBoardStateInterval===undefined){
                this.props.updateViewManager();
                this.fetchBoardStateInterval = setInterval(this.getBoardState.bind(this), this.UPDATE_INTERVAL);
            }
        })
        .catch(err => {
            throw err;
        });
  }

  getBoardState() {
      return fetch("/gameRoom/boardState", { method: "GET", credentials: "include" })
          .then(response => {
              if (!response.ok) {
                  throw response;
              }
              return response.json();
          })
          .then(boardState => {
              this.setState(() => ({ boardState: boardState }));
          })
          .catch(err => {
              throw err;
          });
  }

  leaveGame() {
    fetch("/games/leaveGame", { method: "GET", credentials: "include" })
        .then(response => {
            if (!response.ok) {
                console.log(
                    `user ${this.props.user.name} failed to leave the game.`,
                    response
                );
            }
            this.props.updateViewManager();
        });
  }

  renderEndGameMenu(){
    if(this.state.game.status === gameUtils.GAME_CONSTS.IN_PROGRESS){
        if (this.state.boardState !== ""){
            if(this.state.boardState.stats.isGameEnded){
                clearInterval(this.fetchBoardStateInterval);
                clearInterval(this.fetchGameInterval);
                this.props.updateViewManager();
                return <EndGameMenu boardState={this.state.boardState}/>
            }
        }
    }
  }

  renderExitButton(){
      let isExitAllowed = false;
      if (this.state.game !== ""){
          if (this.state.game.status === gameUtils.GAME_CONSTS.PENDING ||
              this.props.user.status === gameUtils.PLAYER_CONSTS.IDLE){
              isExitAllowed = true;
          }
          else if (this.state.boardState !== "") {
              const player = this.state.boardState.donePlayers.find((player) => player.name === this.props.user.name);
              isExitAllowed = (player !== undefined);
          }
      }

      return (isExitAllowed ? <ExitButton text={"Leave Game"} onClick={this.leaveGame.bind(this)}/> : null);
  }

  renderBoard(){
      console.log(this.state.game);
      if (this.state.game !== ""){
          const playersLeftToStart = this.state.game.playerLimit - this.state.game.players.length;
          return (this.state.game.status === gameUtils.GAME_CONSTS.IN_PROGRESS ?
              <Board user={this.props.user} boardState={this.state.boardState}/>
              : <div className={"board-pending-message"}>waiting for {playersLeftToStart} more players to start</div>);
      }
  }

  render() {
    return (
        <div>
            {this.renderExitButton()}
            <div className={"page-content"}>
                <div className={"gameroom-layout"}>
                    {this.renderBoard()}
                    <Info game={this.state.game} user={this.props.user} boardState={this.state.boardState}/>
                </div>
                {this.renderEndGameMenu()}
            </div>
        </div>
    );
  }
}
