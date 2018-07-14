import React from "react";
import "../../css/global.css";
import Game from "./Game";

export default class GameContainer extends React.Component {
  constructor(...args) {
    super(args);
  }

  render() {
    return (
      <div>
        <Game />
        <Chat />
      </div>
    );
  }
}
