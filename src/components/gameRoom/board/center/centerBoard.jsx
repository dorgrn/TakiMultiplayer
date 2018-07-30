import React from "react";
import PlayZone from "./playZone.jsx";

export default class CenterBoard extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className={"center-board"}>
          <div className={"center-board-layout"}>
            <PlayZone playZone={this.props.boardState.playZone}/>
          </div>
      </div>
    );
  }
}
