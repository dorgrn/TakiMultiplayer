import React from "react";
import Box from "../box.jsx";
import "../../../../css/chat.css";


export default class conversationArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: []
    };

    this.getChatContent = this.getChatContent.bind(this);
  }

  componentDidMount() {
    this.getChatContent();
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  getChatContent() {
    return fetch("/chat", { method: "GET", credentials: "include" })
      .then(response => {
        if (!response.ok) {
          throw response;
        }
        this.timeoutId = setTimeout(this.getChatContent, 500);
        return response.json();
      })
      .then(content => {
        this.setState(() => ({ content }));
      })
      .catch(err => {
        throw err;
      });
  }

    getMessages(){
        let posts = [];

        this.state.content.map((post, index) => {
            const row = <p key={`Chat +${index}`}>{post.user}: {post.message}</p>;
            posts.push(row);
        });

        return <div style={{paddingLeft:"1em"}}>{posts}</div>;
    }

  render() {
    return (
        <Box title={"Chat"} content={this.getMessages()} isBottomStick={true}/>
    );
  }
}
