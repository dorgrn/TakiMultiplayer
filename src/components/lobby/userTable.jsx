import React from "react";
import "../../css/lobby.css";

export default class UserTable extends React.Component {
  constructor(props) {
    super(props);
  }

  renderUserTable() {
    return (
      <table className={"lobby-table users"}>
        <tbody>
          <tr>
            <th key={"head users"}>Users</th>
          </tr>
          {Object.keys(this.props.users).map((user, index) => (
            <tr key={user}>
              <td key={user + "_" + index}>{this.props.users[user].name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    return <div>{this.renderUserTable()}</div>;
  }
}
