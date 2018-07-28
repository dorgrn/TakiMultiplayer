import React from "react";
import "../../css/lobby.css";
const gameUtils = require("../../utils/gameUtils.js");

export default class AddGameForm extends React.Component {
  constructor(props) {
    super(props);
  }


    addGameHandler(e) {
        e.preventDefault();
        const gameName = e.target.elements.gameName.value;
        const playerLimit = e.target.elements.playerLimit.value;
        //TODO: should the PC player option be available on the creation of game?
        console.log(this.props.userInfo);
        const creator = this.props.userInfo.userName;
        const game = gameUtils.createGameRecord(gameName, creator, playerLimit);

        fetch("/games/addGame", {
            method: "POST",
            body: JSON.stringify(game),
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
      //console.log(this.props.userInfo);
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
        <input
          type={"submit"}
          className={"btn"}
          value={"Submit"}
          disabled={this.props.userInfo.gameName !== ""}
        />
      </form>
    );
  }
}
