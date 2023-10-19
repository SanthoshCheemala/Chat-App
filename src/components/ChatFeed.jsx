import { useEffect } from "react";
import MessageForm from "./MessageForm";
import MyMessage from "./MyMessage";
import TheirMessage from "./TheirMessage";

function ChatFeed(props) {

    const { chats, activeChat, userName, messages } = props;
    const chat = chats && chats[activeChat];
    useEffect(() => {
        renderMessages();
      });
    
    const renderReadReceipts = (message,isMyMessage) =>{
       return chat.people.map((person,index)=> person.last_read === message.id && (
            <div 
                key={`read_${index}`}
                className="read-receipt"
                style={{
                    float: isMyMessage ? 'right' : 'left',
                    backgroundImage: `url(${person?.person?.avatar})`
                }}
            />
        ))
    }

    function renderMessages() {
        const keys = Object.keys(messages);
        return keys.map((key, index) => {
            const message = messages[key];
            const lastMessageKey = index === 0 ? null : keys[index - 1];
            const isMessageFromCurrentUser = userName === message.sender.username;
            
            return (
                <div key={`message_${index}`} style={{ width: '100%' }}>
                    <div className="message-block">
                        {isMessageFromCurrentUser ? (
                            <MyMessage message={message} />
                        ) : (
                            <TheirMessage message={message} lastMessage={messages[lastMessageKey]} />
                        )}
                    </div>
                    <div
                        className="read-receipts"
                        style={{
                            marginRight: isMessageFromCurrentUser ? '0px' : '18px',
                            marginLeft: isMessageFromCurrentUser ? '68px' : '0px',
                        }}
                    >
                    {renderReadReceipts(message,isMessageFromCurrentUser)}
                    </div>
                </div>
            );
        });
    }

    if (!chat) return 'Loading...';

    return (
        <div className="chat-feed">
            <div className="chat-title-container">
                <div className="chat-title">{chat.title}</div>
                <div className="chat-subtitle">
                    {chat.people.map((person) => person.person.username).join(', ')}
                </div>
            </div>
            {renderMessages()}
            <div style={{ height: '100px' }} />
            <div className="message-form-container">
                <MessageForm {...props} chatId={activeChat} />
            </div>
        </div>
    );
}

export default ChatFeed;
