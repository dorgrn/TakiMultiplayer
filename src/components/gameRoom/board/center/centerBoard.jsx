import React from "react";
import PlayZone from "./playZone.jsx";
import Deck from "./deck.jsx";
import CloseTakiButton from "./closeTakiButton.jsx";
import arrowsDirection from "../../../resources/direction.png";


export default class CenterBoard extends React.Component {
  constructor() {
    super();
    this.state={
      inTakiMode: false
    };
  }

  takiClosed(){
    fetch("/gameRoom/takiClosed", {method: "GET",credentials: "include"})
        .then(response => {
            if (!response.ok) {
                console.log(
                    `user ${this.props.user.name} failed to close taki`,
                    response
                );
            }
        });
  }

  renderCloseTakiButton(){
      const boardState = this.props.boardState;
      const isTakiMode = boardState.players.some((player)=>(player.inTakiMode===true));

      if (isTakiMode && boardState.playerTurnName===this.props.user.name){
          return <CloseTakiButton onClick={this.takiClosed.bind(this)}/>;
      }

      return null;
  }

  renderDirection(){
      let style = null;
      if (this.props.boardState.direction === -1) {
          style = {transform: "scaleX(-1)"};
      }

      return (
          <div className={"arrows-direction-content"}>
              <img className={"arrow-direction"} src={arrowsDirection} style={style}/>
          </div>
      );
  }

  render() {
    return (
      <div className={"center-board"}>
          {this.renderDirection()}
          {this.renderCloseTakiButton()}
          <div className={"center-board-layout"}>
            <PlayZone playZone={this.props.boardState.playZone}/>
            <Deck user={this.props.user} boardState={this.props.boardState}/>
          </div>
      </div>
    );
  }
}
