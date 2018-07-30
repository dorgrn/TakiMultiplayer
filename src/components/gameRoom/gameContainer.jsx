import React from "react";
import Board from "./board/board.jsx";
import Info from "./info/info.jsx";
import "../../css/global.css";
import "../../css/gameRoom/gameRoom.css";



export default class GameContainer extends React.Component {
  constructor(props) {
    super(props);
    this.UPDATE_TIMEOUT = 500;
    this.state = {
        boardState: "",
        user: props.user
    };
      this.fetchBoardStateInterval = setInterval(
          this.getBoardState.bind(this),
          this.UPDATE_TIMEOUT
      );
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

  render() {
      // console.log(this.state.boardState);
    return (
        this.state.boardState !== "" ?
      <div className={"page-content"}>
          <div className={"gameroom-layout"}>
              <Board user={this.state.user} boardState={this.state.boardState}/>
              <Info/>
          </div>
      </div>
        : null
    );
  }
}
