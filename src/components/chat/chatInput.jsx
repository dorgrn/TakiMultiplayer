import React from "react";

export default class ChatInput extends React.Component {
  constructor(args) {
    super(...args);

    this.state = {
      sendInProgress: false
    };

    this.sendText = this.sendText.bind(this);
  }

  render() {
    return (
      <form className="chat-input-wrapper" onSubmit={this.sendText}>
        <input
          disabled={this.state.sendInProgress}
          placeholder="enter text here"
          ref={input => (this.inputElement = input)}
        />
        <input
          type="submit"
          className="btn"
          disabled={this.state.sendInProgress}
          value="Send"
        />
      </form>
    );
  }

  sendText(e) {
    e.preventDefault();
    this.setState(() => ({ sendInProgress: true }));
    const text = this.inputElement.value;
    fetch("/chat", {
      method: "POST",
      body: text,
      credentials: "include"
    }).then(response => {
      if (!response.ok) {
        throw response;
      }
      this.setState(() => ({ sendInProgress: false }));
      this.inputElement.value = "";
    });
    return false;
  }
}
