import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const socket = io();
  console.log(messages);
  useEffect(() => {
    // Setup socket event listeners
    socket.on('chat message', (msg) => {
      setMessages([...messages, msg]);
    });

    // Clean up function to disconnect socket when component unmounts
    return () => {
      socket.disconnect();
    };
  }, [messages]); // Ensure useEffect runs only when 'messages' state changes

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      // Emit 'chat message' event with input value
      socket.emit('chat message', inputValue);
     
      setInputValue('');
    }
  };

  return (
    <div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          id="input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoComplete="off"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatApp;
