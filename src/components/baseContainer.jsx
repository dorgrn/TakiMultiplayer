import React from "react";
import "../css/global.css";
import ViewManager from "./viewManager.jsx";

export default class BaseContainer extends React.Component {
  constructor() {
    super();
  };

  render() {
    return (
        <div className={"base-background"}>
          <ViewManager/>
        </div>
    )
  }
}
