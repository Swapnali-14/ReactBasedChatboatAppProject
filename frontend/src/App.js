import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


const App = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');

  useEffect(() => {
    // Fetch past messages from the server
    axios.get('http://localhost:5000/messages')
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the messages!', error);
      });
  }, []);

  const handleMessageSend = () => {
    if (!userMessage.trim()) return;

    // Send the user's message to the server
    axios.post('http://localhost:5000/message', { userMessage })
      .then(response => {
        setMessages([
          ...messages,
          { user_message: userMessage, bot_response: response.data.botResponse }
        ]);
        setUserMessage('');
      })
      .catch(error => {
        console.error('Error sending message to bot:', error);
      });
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((message, index) => (
          <div key={index}>
            <div><strong>User:</strong> {message.user_message}</div>
            <div><strong>Bot:</strong> {message.bot_response}</div>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleMessageSend}>Send</button>
      </div>
    </div>
  );
};

export default App;
