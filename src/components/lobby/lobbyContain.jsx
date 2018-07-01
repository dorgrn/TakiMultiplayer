import React from "react";
import "../../css/lobby.css";
import takiImage from "../resources/logo.png";

export default class LobbyContainer extends React.Component {
  constructor(args) {
    super(...args);

    this.state = { isGameAuthor: false };
  }

  render() {
    return (
      <div>
        <button className={"btn"}> logout </button>
        <img id={"logo-lobby"} src={takiImage} />

        <div className={"lobby-container"}>
          <table className={"lobby-table games"}>
            <tbody>
              <tr>
                <th>Game</th>
                <th>Participants</th>
                <th>Out of</th>
                <th>Join / Delete</th>
              </tr>
            </tbody>
          </table>
          <form className={"create-game"}>
            <b>Create new game</b>
            <br />
            <input type={"text"} name={"game-name"} placeholder={"Game name"} />
            <br />
            {"Player amount: "}
            <select name={"participant-amount"}>
              <option value={"2"}>2</option>
              <option value={"3"}>3</option>
              <option value={"4"}>4</option>
            </select>
            <button onSubmit={"golld"} />
          </form>
          <table className={"lobby-table users"}>
            <tbody>
              <tr>
                <th>Username</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
