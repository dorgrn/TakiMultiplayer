import React from "react";
import "../../../css/global.css";
import "../../../css/gameRoom/colorMenu.css";
import ColorOption from "./colorOption.jsx";

export default class ColorMenu extends React.Component {
    constructor() {
      super();
    }

    colorSelected(color){
        fetch("/gameRoom/colorSelected", {method: "POST",body: JSON.stringify(color),credentials: "include"})
            .then(response => {
                if (!response.ok) {
                    console.log(
                        `user ${this.props.user.name} failed to choose color`,
                        response
                    );
                }
            });

    }

    render() {
        return (
            <div className={"menu-background"}>
                <div className={"menu-content"}>
                    <h2>Choose color</h2>
                    <div className={"color-panel"}>
                        <ColorOption color="red" onColorSelected={this.colorSelected.bind(this)}/>
                        <ColorOption color="yellow" onColorSelected={this.colorSelected.bind(this)}/>
                        <ColorOption color="green" onColorSelected={this.colorSelected.bind(this)}/>
                        <ColorOption color="blue" onColorSelected={this.colorSelected.bind(this)}/>
                    </div>
                </div>
            </div>
        );
    }
}

