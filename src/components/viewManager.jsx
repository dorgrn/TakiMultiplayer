import React from "react";
import LoginContainer from "./login/loginContainer.jsx";
import LobbyContainer from "./lobby/lobbyContainer.jsx";
const gameUtils = require("../utils/gameUtils.js");


export default class ViewManager extends React.Component {
  constructor(props) {
    super(props);
    this.UPDATE_TIMEOUT = 500;
    this.state = {
      userInfo: {
          userName: "",
          userStatus: "",
          gameName: ""
      }
    };

    this.fetchInterval = setInterval(
        this.getUserInfo.bind(this),
        this.UPDATE_TIMEOUT
    );
  }

  clearUserInfo(){
    return {userInfo: {
      userName: "",
      userStatus: "",
      gameName: ""}
    };
  }

  renderLogin(){
      return <LoginContainer/>;
  }

  renderLobby() {
    return (
        <LobbyContainer
          userInfo={this.state.userInfo}
        />
    );
  }

  renderGameRoom(){
    return (
        <GameContainter
          userInfo={this.state.userInfo}
        />
    );
  }

  getUserInfo() {
    this.fetchUserInfo()
      .then(userInfo => {
        this.setState(() => ({ userInfo: userInfo}));
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
    if (this.state.userInfo.userStatus === gameUtils.STATUS_CONSTS.PLAYING) {
      return this.renderGameRoom();
    }
    else if (this.state.userInfo.userName !== ""){
      return this.renderLobby();
    }
    else {
      return this.renderLogin();
    }
  }
}
