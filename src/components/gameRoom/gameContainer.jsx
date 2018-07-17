import React from "react";
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
