import React from "react";
import "../../../css/gameRoom/card.css";

const imageFormat = ".png";
const backCardImgSrc = "card_back";
const cardsDir = "../src/textures/cards/";

export default class Card extends React.Component {
  constructor() {
    super();
  }

  render() {
    const image = this.props.card ? this.props.card.frontImg : backCardImgSrc;
    const imgSrc = cardsDir + image + imageFormat;

    const title = this.props.card ? this.props.card.description : "";

    const angle = this.props.rotate ? this.props.rotate : 0;
    const offsetLeft = this.props.leftOffset;
    const offsetTop = this.props.topOffset;
    const styles = { transform: `rotate(${angle}deg)`, left:`${offsetLeft}%`, top:`${offsetTop}%`};

    return (
        <img
            className={`${props.cardStyle}`}
            src={imgSrc}
            style={styles}
            title={title}
            onClick={props.onClick}
        />
    );
  }
}
