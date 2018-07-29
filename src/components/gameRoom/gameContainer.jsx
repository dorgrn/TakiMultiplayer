import React from "react";
import Chat from "../chat/chatContainer.jsx";

export default class GameContainer extends React.Component {
  constructor(props) {
    super(props);
    this.UPDATE_TIMEOUT = 500;
    this.state = {
        boardState: ""
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
    console.log(this.state.boardState);
    return (
      <div>
        <Chat />
      </div>
    );
  }
}
