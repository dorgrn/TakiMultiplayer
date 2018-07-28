import React from "react";
import "../../css/lobby.css";
import GameTable from "./gameTable.jsx";
import UserTable from "./userTable.jsx";
import AddGameForm from "./addGameForm.jsx";
import takiImage from "../resources/logo.png";
import GameContainer from "../gameRoom/gameContainer.jsx";

const gameUtils = require("../../utils/gameUtils.js");
const fetchUtils = require("../../utils/fetchUtils");

export default class LobbyContainer extends React.Component {
  constructor(props) {
    super(props);
    this.UPDATE_TIMEOUT = 500;

    this.getUsers = this.getUsers.bind(this);
    this.getGames = this.getGames.bind(this);

    this.state = {
      status: this.props.currentUser.status, // idle / created / joined / playing
      users: {}, // all users
      games: {}, // all games
      createdGame: false, // indicates that user has created a pending/active game
      gameToShow: null, // the actual game record to move to, null if none
      errMessage: ""
    };
  }

  componentDidMount() {
    this.updateUserTableInterval = setInterval(
      this.getUsers,
      this.UPDATE_TIMEOUT
    );
    this.updateGamesTableInterval = setInterval(
      this.getGames,
      this.UPDATE_TIMEOUT
    );
  }

  componentWillUnmount() {
    clearTimeout(this.updateUserTableInterval);
    clearTimeout(this.updateGamesTableInterval);
  }

  checkMoveToGameRoom(games) {
    const game = this.getFullGameForUser(games);
    if (game) {
      this.setState(() => ({
        status: gameUtils.STATUS_CONSTS.PLAYING,
        gameToShow: game
      }));
    }
  }

  getFullGameForUser(games) {
    const currentUserGames = gameUtils.getGamesForUser(
      games,
      this.props.currentUser
    );
    return _.head(gameUtils.findFullGames(currentUserGames));
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
    return !this.state.gameToShow ? (
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
            joinGameHandler={this.handleJoinGame.bind(this)}
            isUserIdle={this.isUserIdle.bind(this)}
          />
          <AddGameForm
            currentUser={this.props.currentUser}
            addGameHandler={this.handleAddGame.bind(this)}
            disable={!this.isUserIdle()}
          />
          <UserTable users={this.state.users} />
        </div>
        {this.renderErrorMessage()}
      </div>
    ) : (
      <GameContainer
        logoutHandler={this.props.logoutHandler}
        currentUser={this.props.currentUser}
        GameToShow={this.state.gameToShow}
      />
    );
  }

  // handlers
  handleAddGame(e) {
    e.preventDefault();
    const gameName = e.target.elements.gameName.value;
    const playerLimit = e.target.elements.playerLimit.value;
    const creator = this.props.currentUser;
    const game = gameUtils.createGameRecord(gameName, creator, playerLimit);

    fetchUtils
      .postData("/games/addGame", JSON.stringify(game))
      .then(() => {
        this.setState(() => ({
          errMessage: "",
          status: gameUtils.STATUS_CONSTS.CREATED
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
    fetchUtils.postData(
      "/games/deleteGame",
      JSON.stringify({
        gameName: gameRecord.name,
        creator: gameRecord.creator.name
      })
        .then(() => {
          // this assumes only creator can delete his game
          this.setState(prev => {
            if (prev.status === gameUtils.STATUS_CONSTS.CREATED)
              return { status: gameUtils.STATUS_CONSTS.IDLE };
          });
        })
        .catch(err => {
          throw err;
        })
    );
  }

  handleJoinGame(gameRecord) {
    fetchUtils.postData(
      "/games/joinGame",
      JSON.stringify({
        gameName: gameRecord.name
      })
        .then(() => {
          this.setState(() => ({
            status: gameUtils.STATUS_CONSTS.JOINED
          }));
        })
        .catch(err => {
          throw err;
        })
    );
  }

  getUsers() {
    return fetchUtils
      .getData("/users/allUsers")
      .then(data => {
        this.setState(() => ({ users: data }));
      })
      .catch(err => {
        throw err;
      });
  }

  getGames() {
    return fetchUtils
      .getData("/games/allGames")
      .then(data => {
        this.setState(() => ({ games: data }));
        this.checkMoveToGameRoom(data);
      })
      .catch(err => {
        throw err;
      });
  }
}
