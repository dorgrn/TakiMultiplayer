import React from "react";
import "../../../css/global.css";
import "../../../css/gameRoom/colorMenu.css";

export default class ColorOption extends React.Component {
    constructor(props) {
        super();
        this.color = props.color;
    }

    render() {
        return (
            <div
                className="color-option button-UI"
                id={`${this.color}-color`}
                onClick={() => {
                    this.props.onColorSelected(this.color);
                }}
            />
        );
    }
}
