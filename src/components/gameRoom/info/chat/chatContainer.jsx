import React from "react";
import ConversationArea from "./conversationArea.jsx";
import ChatInput from "./chatInput.jsx";
import gameUtils from "../../../../utils/gameUtils.js";
import "../../../../css/chat.css";

export default class Chat extends React.Component{
    constructor(){
        super();
    }

    renderChatInput(){
        if(this.props.user.status === gameUtils.PLAYER_CONSTS.PLAYING ||
            this.props.game.status === gameUtils.GAME_CONSTS.PENDING) {
            return <ChatInput/>;
        }
    }

    render(){
        return (
            <div className="chat-container">
                <ConversationArea />
                {this.renderChatInput()}
            </div>
        );
    }
}
