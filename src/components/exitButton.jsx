import React from "react";


export default class ExitButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
        <div className={"exit-button-wrapper"}>
            <button className={"exit-button"} onClick={this.props.onClick}>X</button>
            <div className={"exit-button-text"}>{this.props.text}</div>
        </div>

    );
  }
}
