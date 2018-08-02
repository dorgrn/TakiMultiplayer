import React from "react";
import Box from "./box.jsx";
import Chat from "./chat/chatContainer.jsx";
import "../../../css/gameRoom/info.css";

export default class Info extends React.Component {
  constructor() {
      super();
  }

  getUsers(){
      let counter = 0;
      let users = [];

      if (this.props.game === ""){
          return;
      }

      this.props.game.players.map((player)=>{
          const row = <p key={`Users +${++counter}`}>[Player] {player.name}</p>;
          users.push(row);
        }
      );

      this.props.game.observers.map((observer)=>{
          const row = <p key={`Users +${++counter}`}>[Observer] {observer.name}</p>;
          users.push(row);
        }
      );

      return <div style={{paddingLeft:"1em"}}>{users}</div>;
  }

  getHistoryPosts(){
      if (this.props.boardState === ""){
          return;
      }

      let history = [];

      this.props.boardState.history.posts.map((post, index) => {
          let color = post.publisher === "Game" ? "red" : "black";
          const row = <p key={`History +${index}`} style={{color:color}}><b>{post.time}</b>:  {post.content}</p>;
          history.push(row);
      });

      return <div style={{paddingLeft:"1em"}}>{history}</div>;
  }

    getGameStatus(){
      if (this.props.boardState === ""){
          return;
      }

      const boardState = this.props.boardState;
      const activePlayer = boardState.players.find((player)=>(player.name===boardState.playerTurnName));
      let status = [];
      let counter = 0;

      status.push(<p key={`Status +${++counter}`}><b>Time:&emsp;</b>{boardState.stats.gameElapsedTime}&emsp;
          <b>Turn:&emsp;</b>{boardState.stats.turnAmount}</p>);
      status.push(<p key={`Status +${++counter}`}><b>Player turn:&emsp;</b>{activePlayer.name}</p>);
      status.push(<p key={`Status +${++counter}`}><b>&uarr;&emsp;Average turn time:&emsp;</b>{activePlayer.stats.turnsAvgTime}</p>);
      status.push(<p key={`Status +${++counter}`}><b>&uarr;&emsp;Last card counter:&emsp;</b>{activePlayer.stats.lastCardCounter}</p>);

      return <div style={{paddingLeft:"1em"}}>{status}</div>;
    }

  render() {

    return (
      <div className={"info-content"}>
          <div className={"info-layout"}>
            <Box id={"game-status"} title={`Game ${this.props.game.name} Status`} content={this.getGameStatus()} isBottomStick={false}/>
            <Box id={"present-users"} title={"Users"} content={this.getUsers()} isBottomStick={false}/>
            <Box id={"moves-history"} title={"History"} content={this.getHistoryPosts()} isBottomStick={true}/>
            <Chat id={"chat"} game={this.props.game} user={this.props.user}/>
          </div>
      </div>
    );
  }
}
