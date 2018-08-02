import React from "react";
import "../../css/lobby/lobby.css";
import UserInfo from "./userInfo.jsx";
import GameTable from "./gameTable.jsx";
import UserTable from "./userTable.jsx";
import takiImage from "../resources/logo.png";


export default class LobbyContainer extends React.Component {
  constructor(props) {
    super(props);
    this.UPDATE_INTERVAL = 2000;

    this.state = {
      users: {}, // all users
      games: {}, // all games
      errMessage: ""
    };

      this.fetchUsersInterval = setInterval(
          this.getUsers.bind(this),
          this.UPDATE_INTERVAL
      );

      this.fetchGamesInterval = setInterval(
          this.getGames.bind(this),
          this.UPDATE_INTERVAL
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

  renderErrorMessage() {
    if (this.state.errMessage) {
      return <div className="error-message">{this.state.errMessage}</div>;
    }
    return null;
  }

  render() {
    return (
        <div className={"page-content"}>
            <div className={"lobby-layout"}>
                <img className={"taki-logo"} src={takiImage} />
                <UserTable users={this.state.users}/>
                <GameTable user={this.props.user} games={this.state.games} updateViewManager={this.props.updateViewManager}/>
                <UserInfo user={this.props.user} updateViewManager={this.props.updateViewManager}/>
            </div>
            {this.renderErrorMessage()}
        </div>
    );
  }
}
