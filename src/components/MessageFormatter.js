import React from 'react';

// MessageFormatter Component
const MessageFormatter = ({ message }) => {
  // Helper function to format text based on keywords and content structure
  const formatMessage = (message) => {
    return (
      <div>
        {message.split('\n').map((line, index) => {
          // Bold important keywords
          if (line.includes('*')) {
            const bolded = line.split('*').map((part, i) => 
              i % 2 === 1 ? <strong key={i}>{part}</strong> : part
            );
            return <p key={index}>{bolded}</p>;
          }
          // Use bullet points for lists
          if (line.startsWith('1. ') || line.startsWith('* ')) {
            return <li key={index}>{line.slice(3)}</li>;
          }
          // Return standard paragraphs for other content
          return <p key={index}>{line}</p>;
        })}
      </div>
    );
  };

  return (
    <div style={styles.messageBox}>
      {formatMessage(message)}
    </div>
  );
};

// Inline styling
const styles = {
  messageBox: {
    backgroundColor: '#f1f1f1',
    padding: '15px',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.6',
  },
  list: {
    margin: '10px 0',
    paddingLeft: '20px',
  },
};

export default MessageFormatter;