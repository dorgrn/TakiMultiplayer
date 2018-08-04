import React from "react";


export default class EndGameMenu extends React.Component {
  constructor(props) {
    super(props);

    this.players = props.boardState.players.sort(this.comparePlayersPlaces);
    this.winner = this.players[0].name;
    this.loser = this.players[this.players.length-1].name;
    this.gameTime = props.boardState.stats.gameElapsedTime;
    this.turnAmount = props.boardState.stats.turnAmount;
  }

  comparePlayersPlaces(player1, player2) {
        if (player1.place < player2.place) {
            return -1;
        }
        if (player1.place > player2.place) {
            return 1;
        }

        return 0;
    }

    buildTableValues() {
        const rows = [];
        for (let i = 0; i < this.players.length; i++) {
            let row = {
                place: this.players[i].place+".",
                name: this.players[i].name,
                avgTime: this.players[i].stats.turnsAvgTime,
                lastCard: this.players[i].stats.lastCardCounter
            };
            rows.push(row);
        }
        return rows;
    }

    makeTableRow(row){
      return (
          <tr key={row.name}>
              <td>{row.place}</td>
              <td>{row.name}</td>
              <td>{row.avgTime}</td>
              <td>{row.lastCard}</td>
          </tr>
      );
    }


  render() {
      const rows = this.buildTableValues();
      return (
          <div className={"menu-background"}>
              <div className={"menu-content"}>
                  <h1>Game Over</h1>
                  <h2>{this.winner} is the winner!</h2>
                  <h2>{this.loser} lost the game.</h2>
                  <h2>Game time: {this.gameTime} , Turn amount: {this.turnAmount}</h2>
                  <table id={"results-table"}>
                      <thead>
                          <tr>
                              <td />
                              <th>Name</th>
                              <th>Average turn time</th>
                              <th>Last card counter</th>
                          </tr>
                      </thead>
                      <tbody>
                      {rows.map(row => this.makeTableRow(row))}
                      </tbody>
                  </table>
              </div>
          </div>
      );
  }
}
