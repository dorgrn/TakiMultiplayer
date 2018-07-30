import React from "react";
import "../../css/lobby/lobby.css";
import GameTable from "./gameTable.jsx";
import UserTable from "./userTable.jsx";
import AddGameForm from "./addGameForm.jsx";
import takiImage from "../resources/logo.png";

export default class LobbyContainer extends React.Component {
  constructor(props) {
    super(props);
    this.UPDATE_TIMEOUT = 500;

    this.state = {
      users: {}, // all users
      games: {}, // all games
      errMessage: ""
    };

  this.fetchUsersInterval = setInterval(
      this.getUsers.bind(this),
      this.UPDATE_TIMEOUT
  );

  this.fetchGamesInterval = setInterval(
      this.getGames.bind(this),
      this.UPDATE_TIMEOUT
  );


  }

  componentWillUnmount() {
    clearInterval(this.fetchUsersInterval);
    clearInterval(this.fetchGamesInterval);
  }

  getUsers() {
    return fetch("/users/allUsers", { method: "GET", credentials: "include" })
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then(data => {
        this.setState(() => ({ users: data }));
      })
      .catch(err => {
        throw err;
      });
  }

  getGames() {
    return fetch("/games/allGames", { method: "GET", credentials: "include" })
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then(data => {
        this.setState(() => ({ games: data }));
      })
      .catch(err => {
        throw err;
      });
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
          }
      );
  }

  renderErrorMessage() {
    if (this.state.errMessage) {
      return <div className="login-error-message">{this.state.errMessage}</div>;
    }
    return null;
  }

  render() {
    return (
      <div>
        <button className={"btn"} onClick={this.logoutHandler.bind(this)}>
          logout
        </button>
        <p>Username: {this.props.user.name}</p>
        <img id={"logo-lobby"} src={takiImage} />

        <div className={"lobby-container"}>
          <GameTable
            games={this.state.games}
            user={this.props.user}
          />
          <AddGameForm
            user={this.props.user}
          />
          <UserTable users={this.state.users} />
        </div>
        {this.renderErrorMessage()}
      </div>
    );
  }
}
