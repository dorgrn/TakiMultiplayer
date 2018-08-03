import React from "react";
import "../../css/lobby/gameTable.css";
import gameUtils from "../../utils/gameUtils.js";

export default class GameTableBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errMessage:""
    }
  }

    joinGameHandler(gameName) {
        fetch("/games/joinGame", {
            method: "POST",
            body: JSON.stringify(gameName),
            credentials: "include"
        })
            .then(response => {
                if (!response.ok) {
                    throw response;
                }
                this.props.updateViewManager();
            })
            .catch(err => {
                throw err;
            });
    }

    deleteGameHandler(gameName) {
        fetch("/games/deleteGame", {
            method: "POST",
            body: JSON.stringify(gameName),
            credentials: "include"
        })
            .then(response => {
                if (!response.ok) {
                    throw response;
                }
                this.props.updateViewManager();
            })
            .catch(err => {
                throw err;
            });
    }

    renderDeleteButton() {
        const game = this.props.game;
        if (this.props.game.creator.name === this.props.user.name) {
          return (
              <button
                  className={"button-red"}
                  style={{fontSize: "14px"}}
                  onClick={this.deleteGameHandler.bind(this, game.name)}>
                    Delete
              </button>
          );
        }
    }

    renderJoinButton(){
      const game = this.props.game;
      let text;
      let color;
      if (game.status === gameUtils.GAME_CONSTS.IN_PROGRESS ||
          game.players.length === game.playerLimit){
        text="Join as Observer";
        color="orange";
      }
      else{
        text="Join as Player";
        color="green";
      }

      return (
          <button
            className={`button-${color}`}
            style={{fontSize: "14px"}}
            onClick={this.joinGameHandler.bind(this, game.name)}>
              {text}
          </button>
      );
    }

    renderErrorMessage() {
        if (this.state.errMessage) {
            return <div className="error-message">{this.state.errMessage}</div>;
        }
        return null;
    }

  render() {
    const name = this.props.game.name;
    const creator = this.props.game.creator.name;
    const playersPending = this.props.game.players.length;
    const playerLimit = this.props.game.playerLimit;
    const status = this.props.game.status;
    const PCPlayer = this.props.game.isPCPlayerIn ? "include" : "not include";

    return (
        <div className={"game-table-box"}>
            <div className={"game-table-box-headline"}>{name}</div>
            <div>
                <div className={"game-table-box-details"}>
                    <ul className={"game-table-box-cells"}>
                        <li className={"game-table-box-cell"}><u>Creator:</u>&nbsp;{creator}</li>
                        <li className={"game-table-box-cell"}><u>Players:</u>&nbsp;{playersPending}/{playerLimit}</li>
                        <li className={"game-table-box-cell"}><u>Status:</u>&nbsp;{status}</li>
                        <li className={"game-table-box-cell"}><u>PC player:</u>&nbsp;{PCPlayer}</li>
                    </ul>
                </div>
            </div>
            <div className={"game-table-box-buttons"}>
                {this.renderJoinButton()}
                {this.renderDeleteButton()}
                {this.renderErrorMessage()}
            </div>
        </div>
    );
  }
}
