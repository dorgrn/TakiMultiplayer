import React from "react";
import LoginModal from "./login-modal.jsx";
import ChatContainer from "./chat/chatContainer.jsx";
import LobbyContainer from "./lobby/lobbyContain.jsx";

export default class BaseContainer extends React.Component {
  constructor(args) {
    super(...args);
    this.state = {
      showLogin: true,
      currentUser: {
        name: ""
      }
    };

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleLoginError = this.handleLoginError.bind(this);
    this.fetchUserInfo = this.fetchUserInfo.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);

    this.getUserName();
  }

  handleSuccessfulLogin() {
    this.setState(() => ({ showLogin: false }), this.getUserName);
  }

  handleLoginError() {
    console.error("login failed");
    this.setState(() => ({ showLogin: true }));
  }

  renderLobby() {
    return (
      <div>
        <LobbyContainer
          logoutHandler={this.logoutHandler}
          currentUser={this.state.currentUser}
          fetchUserInfo={this.fetchUserInfo}
        />
      </div>
    );
  }

  renderChatRoom() {
    return (
      <div className="chat-base-container">
        <div className="user-info-area">
          Hello {this.state.currentUser.name}
          <button className="logout btn-lobby" onClick={this.logoutHandler}>
            Logout
          </button>
        </div>
        <ChatContainer />
      </div>
    );
  }

  getUserName() {
    this.fetchUserInfo()
      .then(userInfo => {
        this.setState(() => ({ currentUser: userInfo, showLogin: false }));
      })
      .catch(err => {
        if (err.status === 401) {
          // incase we're getting 'unautorithed' as response
          this.setState(() => ({ showLogin: true }));
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

  logoutHandler() {
    fetch("/users/logout", { method: "GET", credentials: "include" }).then(
      response => {
        if (!response.ok) {
          console.log(
            `failed to logout user ${this.state.currentUser.name} `,
            response
          );
        }
        this.setState(() => ({ currentUser: { name: "" }, showLogin: true }));
      }
    );
  }

  render() {
    if (this.state.showLogin) {
      return (
        <LoginModal
          loginSuccessHandler={this.handleSuccessfulLogin}
          loginErrorHandler={this.handleLoginError}
          logoutHandler={this.logoutHandler}
        />
      );
    }
    return this.renderLobby();
  }
}
