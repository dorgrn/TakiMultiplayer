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
    const offsetLeft = this.props.leftOffset;
    const offsetTop = this.props.topOffset;
    //const styles = { transform: `rotate(${angle}deg)`, left:`${offsetLeft}%`, top:`${offsetTop}%`};
    const styles = { transform: `rotate(${angle}deg)`, left:`${offsetLeft}%`};


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
