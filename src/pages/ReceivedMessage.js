import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReceivedMessages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          'http://127.0.0.1:5000/messages/received',
          { withCredentials: true }
        );
        setMessages(response.data);
        setError('');
      } catch (error) {
        setError('Error fetching messages');
        setMessages([]);
      }
    };
    fetchMessages();
  }, []);

  return (
    <div>
      <h1>Received Messages</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <p>From: {message.sender_id}</p>
            <p>{message.content}</p>
            <p>{message.timestamp}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReceivedMessages;
