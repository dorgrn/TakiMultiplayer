import React from "react";
import "../../css/lobby.css";
import GameTable from "./gameTable.jsx";
import UserTable from "./userTable.jsx";
import AddGameForm from "./addGameForm.jsx";

import takiImage from "../resources/logo.png";

export default class LobbyContainer extends React.Component {
  constructor(args) {
    super(...args);
    this.UPDATE_TIMEOUT = 500;

    this.getUsers = this.getUsers.bind(this);
    this.getGames = this.getGames.bind(this);

    this.state = {
      users: {},
      games: {},
      createdGame: false, // indicates that user has created a pending/active game
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

  createGame(name, creator, playerLimit) {
    return {
      name: name,
      creator: creator,
      playerLimit: playerLimit
    };
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
    const creator = this.props.currentUser;
    const game = this.createGame(gameName, creator, playerLimit);

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
          errMessage: "",
          createdGame: true // TODO: set to false when game ends/deleted
        }));
      })
      .catch(err => {
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
        // this assumes only creator can delete his game
        this.setState(() => ({ createdGame: false }));
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

  renderErrorMessage() {
    if (this.state.errMessage) {
      return <div className="login-error-message">{this.state.errMessage}</div>;
    }
    return null;
  }

  render() {
    return (
      <div>
        <button className={"btn"} onClick={this.props.logoutHandler.bind(this)}>
          logout
        </button>
        <p>Username: {this.props.currentUser.name}</p>
        <img id={"logo-lobby"} src={takiImage} />

        <div className={"lobby-container"}>
          <GameTable
            games={this.state.games}
            currentUser={this.props.currentUser}
            deleteGameHandler={this.handleDeleteGame.bind(this)}
          />
          <AddGameForm
            currentUser={this.props.currentUser}
            addGameHandler={this.handleAddGame.bind(this)}
            createdGame={this.state.createdGame}
          />
          <UserTable users={this.state.users} />
        </div>
        {this.renderErrorMessage()}
      </div>
    );
  }
}
