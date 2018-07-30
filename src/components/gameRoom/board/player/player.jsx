import React from "react";
import "../../../../css/gameRoom/player.css";
import Hand from "./hand.jsx";

export default class Player extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className={`player-${this.props.direction}`}>
          <Hand
              user={this.props.user}
              player={this.props.player}
              playerTurnName={this.props.playerTurnName}
              direction={this.props.direction}/>

          <div className={"player-headline"}>
              <div className={"player-icon"}>
                  <img className={"player-icon-img"} src={"./textures/user_icon.png"} />
              </div>
              <div className={"player-name"}>
                  {this.props.player.name}
              </div>
          </div>
      </div>
    );
  }
}
