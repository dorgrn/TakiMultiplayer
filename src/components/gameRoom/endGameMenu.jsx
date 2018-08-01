import React from "react";


export default class EndGameMenu extends React.Component {
  constructor(props) {
    super(props);
  }




  render() {
      return (
          <div className={"menu-background"}>
              <div className={"menu-content"}>
                  <h2>Game over</h2>
              </div>
          </div>
      );
  }
}
