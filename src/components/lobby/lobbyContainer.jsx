import React from "react";
import "../../css/lobby.css";
import GameTable from "./gameTable.jsx";
import UserTable from "./userTable.jsx";
import AddGameForm from "./addGameForm.jsx";
import takiImage from "../resources/logo.png";

const gameUtils = require("../../utils/gameUtils.js");

export default class LobbyContainer extends React.Component {
  constructor(props) {
    super(props);
    this.UPDATE_TIMEOUT = 500;

    this.getUsers = this.getUsers.bind(this);
    this.getGames = this.getGames.bind(this);

    this.state = {
      users: {}, // all users
      games: {}, // all games
      errMessage: ""
    };
  }

  componentDidMount() {
    this.getUsers();
    this.getGames();
  }

  componentWillUnmount() {
    clearTimeout(this.updateUserTableInterval);
    clearTimeout(this.updateGamesTableInterval);
  }

  getUsers() {
    return fetch("/users/allUsers", { method: "GET", credentials: "include" })
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        this.updateUserTableInterval = setTimeout(
          this.getUsers,
          this.UPDATE_TIMEOUT
        );
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
        this.updateGamesTableInterval = setTimeout(
          this.getGames,
          this.UPDATE_TIMEOUT
        );
        return response.json();
      })
      .then(data => {
        this.setState(() => ({ games: data }));
      })
      .catch(err => {
        throw err;
      });
  }

  handleAddGame(e) {
    e.preventDefault();
    const gameName = e.target.elements.gameName.value;
    const playerLimit = e.target.elements.playerLimit.value;
    //TODO: should the PC player option be available on the creation of game?
    const creator = this.props.userName;
    const game = gameUtils.createGameRecord(gameName, creator, playerLimit);

    fetch("/games/addGame", {
      method: "POST",
      body: JSON.stringify(game),
      credentials: "include"
    })
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        this.setState(() => ({
          errMessage: ""
        }));
      })
      .catch(() => {
        this.setState(() => ({
          errMessage: "Game name already exist, please try another one"
        }));
      });
    return false;
  }

  handleDeleteGame(gameRecord) {
    fetch("/games/deleteGame", {
      method: "POST",
      body: JSON.stringify({
        gameName: gameRecord.name,
        creator: gameRecord.creator.name
      }),
      credentials: "include"
    })
      .then(response => {
        if (!response.ok) {
          throw response;
        }
      })
      .catch(err => {
        throw err;
      });
  }

  handleJoinGame(gameRecord) {
    fetch("/games/joinGame", {
      method: "POST",
      body: JSON.stringify({
        gameName: gameRecord.name
      }),
      credentials: "include"
    })
      .then(response => {
        if (!response.ok) {
          throw response;
        }
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
                      `failed to logout user ${this.props.userName} `,
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

  isUserIdle() {
    return this.state.status === gameUtils.STATUS_CONSTS.IDLE;
  }

  render() {
    return (
      <div>
        <button className={"btn"} onClick={this.logoutHandler()}>
          logout
        </button>
        <p>Username: {this.props.userName}</p>
        <img id={"logo-lobby"} src={takiImage} />

        <div className={"lobby-container"}>
          <GameTable
            games={this.state.games}
            currentUser={this.props.userName}
            deleteGameHandler={this.handleDeleteGame.bind(this)}
            joinGameHandler={this.handleJoinGame.bind(this)}
            isUserIdle={this.isUserIdle.bind(this)}
          />
          <AddGameForm
            currentUser={this.props.userName}
            addGameHandler={this.handleAddGame.bind(this)}
            disable={!this.isUserIdle()}
          />
          <UserTable users={this.state.users} />
        </div>
        {this.renderErrorMessage()}
      </div>
    );
  }
}
