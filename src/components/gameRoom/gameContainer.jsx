import React from "react";
import Chat from "../chat/chatContainer.jsx";
import Sidebar from "./Sidebar.jsx";

export default class GameContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {/*<Sidebar gameToShow={this.props.gameToShow} />*/}
        <Chat />
      </div>
    );
  }
}
