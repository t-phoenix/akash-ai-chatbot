// ChatMessage.js
import React from 'react';
import userbot from '../illustrations/Rectangle_59.png';
import chatbot from '../illustrations/Rectangle_63.png'
import MessageFormatter from './MessageFormatter';
// import './ChatMessage.css';

const ChatMessage = ({ role, content }) => {
  const isUser = role === 'user';
  return (
    <div className={`chat-message ${isUser ? 'user' : 'bot'}`}>
        {role === 'user' ? 
            <div className='chat-content'>
                <img src={userbot} alt='user-img' width={50} height={50}/>
                <p>{content}</p>
            </div>: 
            <div className='chat-content'>
                <img src={chatbot} alt='user-img' width={50} height={50} />
                <MessageFormatter message={content} />
            </div>}
      
    </div>
  );
};

export default ChatMessage;