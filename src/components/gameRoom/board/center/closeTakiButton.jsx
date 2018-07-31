import React from "react";
import "../../../../css/global.css";
import "../../../../css/gameRoom/closeTaki.css";

export default class CloseTakiButton extends React.Component {
  constructor(){
    super();
  }

  render(){
      return (
          <button
              type={"button"}
              className={"close-taki button-UI"}
              onClick={this.props.onClick}>
              Close Taki
          </button>
      );
  }
}
