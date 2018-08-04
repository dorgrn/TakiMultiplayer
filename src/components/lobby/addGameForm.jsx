import React from "react";
import "../../css/lobby/lobby.css";

export default class AddGameForm extends React.Component {
  constructor(props) {
    super(props);

    this.state={
        shouldAddPCPlayer: false,
        errMessage: ""
    };
  }

    handleAddPCPlayer(){
        this.setState(() => ({shouldAddPCPlayer: !this.state.shouldAddPCPlayer}));
    }

    createGameRecord(name, playerLimit, shouldAddPCPlayer) {
        return {
            gameName: name,
            playerLimit: playerLimit,
            shouldAddPCPlayer: shouldAddPCPlayer
        };
    }

    createNewGameHandler(e) {
        e.preventDefault();
        const gameName = e.target.elements.gameName.value;
        const playerLimit = e.target.elements.playerLimit.value;
        const shouldAddPCPlayer = this.state.shouldAddPCPlayer;
        const gameRecord = this.createGameRecord(gameName, playerLimit, shouldAddPCPlayer);
        if (gameName === ""){
            this.setState(() => ({
                errMessage: "Game name is missing"
            }));
        }
        else{
            fetch("/games/addGame", {
                method: "POST",
                body: JSON.stringify(gameRecord),
                credentials: "include"
            })
                .then(response => {
                    if (!response.ok) {
                        throw response;
                    }
                    this.setState(() => ({
                        errMessage: ""
                    }));
                    this.props.onCloseForm();
                    this.props.updateViewManager();
                })
                .catch(() => {
                    this.setState(() => ({
                        errMessage: "Game name already exist, please try another one"
                    }));
                });
            return false;
        }
    }

    renderErrorMessage() {
        if (this.state.errMessage) {
            return <div className="error-message">{this.state.errMessage}</div>;
        }
        return null;
    }

  render() {
      if (!this.props.show){
          return null;
      }

      return (
          <div className={"menu-background"}>
              <div className={"menu-content"}>
                  <form id={"add-game-form"} onSubmit={this.createNewGameHandler.bind(this)} onReset={this.props.onCloseForm}>
                      <h2>Create new game</h2>
                      <br />
                      <label htmlFor={"gameName"}>Game name: </label>
                      <input type={"text"} name={"gameName"} placeholder={"Game name"} />
                      <br />
                      <label htmlFor={"playerLimit"}>Players amount: </label>
                      <select name={"playerLimit"}>
                          <option value={"2"}>2</option>
                          <option value={"3"}>3</option>
                          <option value={"4"}>4</option>
                      </select>
                      <br />
                      <input type={"checkbox"} name={"shouldAddPCPlayer"} onChange={this.handleAddPCPlayer.bind(this)}/>
                      <label htmlFor={"shouldAddPCPlayer"}>Add PC Player</label>
                      <br />
                      <input type={"submit"} className={"button-green"} value={"Submit"}/>
                      <input type={"reset"} className={"button-red"} value={"Cancel"}/>
                  </form>
                  {this.renderErrorMessage()}
              </div>
          </div>
  );
  }
}
