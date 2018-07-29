import React from "react";
import "../../css/lobby.css";
const gameUtils = require("../../utils/gameUtils.js");

export default class AddGameForm extends React.Component {
  constructor(props) {
    super(props);

    this.state={
        shouldAddPCPlayer: false
    }
  }

    handleAddPCPlayer(){
        this.setState(() => ({shouldAddPCPlayer: !this.state.shouldAddPCPlayer}));
    }

    addGameHandler(e) {
        e.preventDefault();
        const gameName = e.target.elements.gameName.value;
        const playerLimit = e.target.elements.playerLimit.value;
        const shouldAddPCPlayer = this.state.shouldAddPCPlayer;
        const gameRecord = gameUtils.createGameRecord(gameName, playerLimit, shouldAddPCPlayer);

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
            })
            .catch(() => {
                this.setState(() => ({
                    errMessage: "Game name already exist, please try another one"
                }));
            });
        return false;
    }

  render() {
      return (
      <form className={"create-game"} onSubmit={this.addGameHandler.bind(this)}>
        <h2>Create new game</h2>
        <br />
        <input type={"text"} name={"gameName"} placeholder={"Game name"} />
        <br />
        <label htmlFor={"playerLimit"}>Participant amount: </label>
        <select name={"playerLimit"}>
          <option value={"2"}>2</option>
          <option value={"3"}>3</option>
          <option value={"4"}>4</option>
        </select>
        <br />
        <input type={"checkbox"} name={"shouldAddPCPlayer"} onChange={this.handleAddPCPlayer.bind(this)}/>
        <label htmlFor={"shouldAddPcPlayer"}>Add PC Player</label>
        <br />
        <input
          type={"submit"}
          className={"btn"}
          value={"Submit"}
          disabled={this.props.user.gameName !== ""}
        />
      </form>
    );
  }
}
