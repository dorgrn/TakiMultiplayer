import React from "react";
import PlayZone from "./playZone.jsx";
import Deck from "./deck.jsx";

export default class CenterBoard extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className={"center-board"}>
          <div className={"center-board-layout"}>
            <PlayZone playZone={this.props.boardState.playZone}/>
              <Deck user={this.props.user} boardState={this.props.boardState}/>
          </div>
      </div>
    );
  }
}
