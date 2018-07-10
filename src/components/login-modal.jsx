import React from "react";
import takiImage from "./resources/logo.png";

export default class LoginModal extends React.Component {
  constructor(args) {
    super(...args);

    this.state = {
      errMessage: ""
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  renderErrorMessage() {
    if (this.state.errMessage) {
      return <div className="login-error-message">{this.state.errMessage}</div>;
    }
    return null;
  }

  handleLogin(e) {
    e.preventDefault();
    const userName = e.target.elements.userName.value;
    fetch("/users/addUser", {
      method: "POST",
      body: userName,
      credentials: "include"
    }).then(response => {
      if (response.ok) {
        this.setState(() => ({ errMessage: "" }));
        this.props.loginSuccessHandler();
      } else {
        if (response.status === 403) {
          this.setState(() => ({
            errMessage: "User name already exist, please try another one"
          }));
        }
        this.props.loginErrorHandler();
      }
    });
    return false;
  }

  render() {
    return (
      <div className="login-page-wrapper">
        <img className="taki-logo" src={takiImage} />
        <form onSubmit={this.handleLogin}>
          <label className="username-label" htmlFor="userName">
            Username:{" "}
          </label>
          <input className="username-input" name="userName" />
          <input className="submit-btn btn-lobby" type="submit" value="Login" />
        </form>
        {this.renderErrorMessage()}
      </div>
    );
  }
}
