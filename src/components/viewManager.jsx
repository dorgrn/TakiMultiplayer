import React from "react";
import LoginModal from "./login/login-modal.jsx";
import LobbyContainer from "./lobby/lobbyContainer.jsx";
const gameUtils = require("../utils/gameUtils.js");


export default class ViewManager extends React.Component {
  constructor(props) {
    super(props);
    this.UPDATE_TIMEOUT = 500;
    this.state = {
      userName: "",
      userStatus: ""
    };

    this.fetchUserInfo = this.fetchUserInfo.bind(this);
    this.updateUserTableInterval = setTimeout(
        this.getUserInfo(),
        this.UPDATE_TIMEOUT
    );
  }

  clearUserInfo(){
    return {userName: "", userStatus: ""};
  }

  renderLogin(){
      return (<LoginModal/>);
  }

  renderLobby() {
    return (
        <LobbyContainer
          userName={this.state.userName}
        />
    );
  }

  renderGameRoom(){
    return (
        <GameContainter
          userName={this.state.userName}
        />
    );
  }

  getUserInfo() {
    this.fetchUserInfo()
      .then(userInfo => {
        this.setState(() => ({ userName: userInfo.name, userStatus: userInfo.status}));
      })
      .catch(err => {
        if (err.status === 401) {
          // incase we're getting 'unautorithed' as response
          this.setState(() => (this.clearUserInfo()));
        } else {
          throw err; // in case we're getting an error
        }
      });
  }

  fetchUserInfo() {
    return fetch("/users", { method: "GET", credentials: "include" }).then(
      response => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      }
    );
  }


  render() {
    if (this.userStatus === gameUtils.STATUS_CONSTS.PLAYING) {
      this.renderGameRoom();
    }
    else if (this.userName !== ""){
        this.renderLobby();
    }
    else {
      this.renderLogin();
    }
  }
}
