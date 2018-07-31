import React from "react";
import ConversationArea from "./conversationArea.jsx";
import ChatInput from "./chatInput.jsx";
import "../../../../css/chat.css";

export default function Chat() {
  return (
    <div className="chat-container">
      <ConversationArea />
      <ChatInput />
    </div>
  );
}
