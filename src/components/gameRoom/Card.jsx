import React from "react";
import "../css/style.css";

const Card = props => {
  const imageFormat = ".png";
  const backCardImgSrc = "card_back";
  const cardsDir = "../src/textures/cards/";
  const image =
    props.holder === "user" || props.holder === "playZone"
      ? props.frontImg
      : backCardImgSrc;

  const imgSrc = cardsDir + image + imageFormat;
  const angle = props.rotate ? props.rotate : 0;
  const styles = { transform: `rotate(${angle}deg)` };
  const title = props.holder === "user" ? props.description : "";

  return (
    <img
      className={`${props.cardStyle}`}
      src={imgSrc}
      style={styles}
      onClick={props.inShowMode ? null : props.onClick}
      title={title}
    />
  );
};

export default Card;
