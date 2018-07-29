import React from "react";
import "../css/style.css";
import "../css/styleCloseTaki.css";

const CloseTakiButton = props => {
  return (
    <button
      type={"button"}
      className={"close-taki button-UI"}
      onClick={props.onClick}
    >
      Close Taki
    </button>
  );
};

export default CloseTakiButton;
