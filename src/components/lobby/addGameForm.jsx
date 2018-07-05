import React from "react";
import "../../css/lobby.css";

export default class AddGameForm extends React.Component {
  constructor(props) {
    super(props);
  }

  renderGamesForm() {
    return (
      <form className={"create-game"} onSubmit={this.props.addGameHandler}>
        <h2>Create new game</h2>
        <br />
        <input type={"text"} name={"gameName"} placeholder={"Game name"} />
        <br />
        {"Player amount: "}
        <select name={"partAmount"}>
          <option value={"2"}>2</option>
          <option value={"3"}>3</option>
          <option value={"4"}>4</option>
        </select>
        <br />
        <input type={"submit"} className={"btn"} value={"Submit"} />
      </form>
    );
  }

  render() {
    return <div>{this.renderGamesForm()}</div>;
  }
}
