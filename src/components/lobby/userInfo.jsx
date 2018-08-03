import React from "react";
import "../../css/lobby/lobby.css";
import "../../css/lobby/userInfo.css";
import AddGameForm from "./addGameForm.jsx";

export default class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.user = props.user;
    this.state ={
        showAddGameForm: false
    };
  }

    logoutHandler() {
        fetch("/users/logout", { method: "GET", credentials: "include" }).then(
            response => {
                if (!response.ok) {
                    console.log(
                        `failed to logout user ${this.props.user.name} `,
                        response
                    );
                }
                else {
                    this.props.updateViewManager();
                }
            }
        );
    }

  toggleAddGameForm(){
      this.setState(()=>({showAddGameForm: !this.state.showAddGameForm}));
  }

  render() {
    return (
        <div className={"lobby-column"} id={"user-info"}>
            <div className={"lobby-column-headline"}>
                Info
            </div>
            <div className={"user-info-content"}>
                <p><b>Name: </b>{this.user.name}</p>
                <button className={"button-green"} onClick={this.toggleAddGameForm.bind(this)}>New Game</button>
                <button className={"button-red"} onClick={this.logoutHandler.bind(this)}>Logout</button>
            </div>

            <AddGameForm
                show={this.state.showAddGameForm}
                onCloseForm={this.toggleAddGameForm.bind(this)}
                updateViewManager={this.props.updateViewManager}
            />
        </div>
    );
  }
}
