import React from "react";
import "../../css/global.css";
import Chat from "../chat/chatContainer.jsx";

export default class GameContainer extends React.Component {
  constructor(...args) {
    super(args);
  }

  render() {
    return (
      <div>
        <Chat />
      </div>
    );
  }
}
