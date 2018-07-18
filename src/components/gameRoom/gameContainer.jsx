import React from "react";
import Chat from "../chat/chatContainer.jsx";

export default class GameContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {/*<Game />*/}
        <Chat />
      </div>
    );
  }
}
