import React from "react";
import "../../../css/box.css";

export default class Box extends React.Component {
  constructor() {
    super();
  }

  render() {
    const stick = this.props.isBottomStick ? "-stick-bottom" : "";

    return (
        <div className={"box"} id={this.props.id}>
            <div className={"box-headline"}>
                {this.props.title}
            </div>
            <div className={"box-content"}>
                <div className={`scrollbar${stick}`}>
                    {this.props.content}
                </div>
            </div>
        </div>
    );
  }
}
