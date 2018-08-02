import React from "react";
import "../../../../css/gameRoom/player.css";
import pcIcon from "../../../resources/pcIcon.png";
import Hand from "./hand.jsx";
const _ = require("lodash");

function importAll(r) {
    let images = {};
    r.keys().map((key) => {images[(key.replace('./', '')).replace('.png', '')]=r(key)});
    return images;
}
const icons = importAll(require.context("../../../resources/emoji/", false, /\.png$/));

export default class Player extends React.Component {
  constructor() {
    super();
  }

  componentWillMount(){
      if (this.props.player.type === "user"){
          this.icon = this.randomIcon();
      }
      else{
          this.icon = pcIcon;
      }
  }

  randomIcon(){
      const amount = _.keys(icons).length;
      const index = Math.floor(Math.random() * amount);
      return _.values(icons)[index];
  }

  render() {
    const color = this.props.player.name === this.props.playerTurnName ? "green" : "lightgray";
    const opacity = this.props.player.playingStatus === "done" ? 0.6 : 1;
    return (
      <div className={`player-${this.props.direction}`}>
          <Hand
              user={this.props.user}
              player={this.props.player}
              playerTurnName={this.props.playerTurnName}
              direction={this.props.direction}
          />

          <div className={"player-headline "+`headline-${this.props.side}`} style={{backgroundColor:`${color}`, opacity:`${opacity}`}}>
              <div className={"player-icon"}>
                  <img className={"player-icon-img"} src={this.icon} />
              </div>
              <div className={"player-name"}>
                  <b>{this.props.player.name}</b>&nbsp;&nbsp;&nbsp;<small>status: {this.props.player.playingStatus}</small>
              </div>

          </div>
      </div>
    );
  }
}
