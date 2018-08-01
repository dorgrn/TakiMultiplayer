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
        boardState: "",
        user: props.user
    };

    this.fetchBoardStateInterval = setInterval(this.getBoardState.bind(this), this.UPDATE_INTERVAL);
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

  gameEnded(){
    fetch("/gameRoom/gameEnded", {method: "GET",credentials: "include"})
        .then(response => {
            if (!response.ok) {
                console.log(
                    `user ${this.props.user.name} failed to end the game.`,
                    response
                );
            }
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
        });
  }

  renderEndGameMenu(){
    if(this.state.boardState.stats.isGameEnded){
        clearInterval(this.fetchBoardStateInterval);
        clearInterval(this.fetchGameInterval);
        this.gameEnded();
        return <EndGameMenu boardState={this.state.boardState}/>
    }
  }

  renderExitButton(){
      if (this.state.user.status === gameUtils.PLAYER_CONSTS.IDLE){
          return <ExitButton text={"Leave Game"} onClick={this.leaveGame.bind(this)}/>;
      }
  }

  render() {
      // console.log(this.state.boardState);
    return (
        this.state.boardState !== "" ?
            <div>
                {this.renderExitButton()}
                <div className={"page-content"}>
                    <div className={"gameroom-layout"}>
                        <Board user={this.state.user} boardState={this.state.boardState}/>
                        <Info game={this.state.game} user={this.props.user} boardState={this.state.boardState}/>
                    </div>
                    {this.renderEndGameMenu()}
                </div>
            </div>
        : null
    );
  }
}
