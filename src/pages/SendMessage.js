import React, { useState } from 'react';
import axios from 'axios';

const SendMessage = () => {
  const [recipientId, setRecipientId] = useState('');
  const [content, setContent] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/messages/send',
        {
          recipient_id: recipientId,
          content: content,
        },
        { withCredentials: true }
      );
      if (response.status === 201) {
        setSuccess('Message sent successfully!');
        setError('');
      }
    } catch (error) {
      setError('Error sending message');
      setSuccess('');
    }
  };

  return (
    <div>
      <h1>Send Message</h1>
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSend}>
        <input
          type="text"
          value={recipientId}
          onChange={(e) => setRecipientId(e.target.value)}
          placeholder="Recipient ID"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Message content"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default SendMessage;
