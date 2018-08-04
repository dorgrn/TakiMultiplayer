import React from "react";
import "../../css/lobby/lobby.css";
import "../../css/lobby/userTable.css";

export default class UserTable extends React.Component {
  constructor(props) {
    super(props);
  }

  renderUserTable() {
    return (
      <table className={"users-table"}>
        <tbody>
          <tr>
              <th>Name</th>
              <th>Status</th>
          </tr>
          {Object.keys(this.props.users).map((user, index) => (
            <tr key={user}>
              <td key={user + "_" + index + "_name"}>{this.props.users[user].name}</td>
              <td key={user + "_" + index + "_status"}>{this.props.users[user].status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    return(
        <div className={"lobby-column"} id={"users-table"}>
            <div className={"lobby-column-headline"}>
                Users
            </div>
            <div className={"lobby-column-content lobby-scrollbar"}>
                {this.renderUserTable()}
            </div>
        </div>);
  }
}
