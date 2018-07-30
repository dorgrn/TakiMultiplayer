import React from "react";
import "../../../css/gameRoom/card.css";
const backCardImg = "card_back";

function importAll(r) {
    let images = {};
    r.keys().map((key) => {images[(key.replace('./', '')).replace('.png', '')]=r(key)});
    return images;
}
const images = importAll(require.context("../../resources/cards/", false, /\.png$/));

export default class Card extends React.Component {
  constructor() {
    super();
  }

  render() {
    const image = this.props.card ? this.props.card.frontImg : backCardImg;
    const title = this.props.card ? this.props.card.description : "";

    const angle = this.props.rotate ? this.props.rotate : 0;
    const leftOffset = this.props.leftOffset;
    const topOffset = this.props.topOffset;
    let styles;
    if (leftOffset !== undefined){
        styles = { transform: `rotate(${angle}deg)`, left:`${leftOffset}%`};
    }
    else if (topOffset !== undefined){
        styles = { transform: `rotate(${angle}deg)`, top:`${topOffset}%`};
    }
    else {
        styles = { transform: `rotate(${angle}deg)`};
    }

    return (
        <img
            className={`${this.props.cardStyle}`}
            src={images[image]}
            style={styles}
            title={title}
            onClick={this.props.onClick}
        />
    );
  }
}
