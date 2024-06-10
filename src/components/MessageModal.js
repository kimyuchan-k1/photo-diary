import React, { useState } from 'react';
import axios from 'axios';

const MessageModal = ({ recipientId, onClose, onSuccess }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        '/messages/send',
        {
          recipient_id: recipientId,
          content: content,
        },
        { withCredentials: true }
      );
      if (response.status === 201) {
        setContent('');
        setError('');
        onSuccess();
        onClose();
      }
    } catch (error) {
      setError('Error sending message');
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Send Message</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSend}>
              <div className="form-group">
                <textarea
                  className="form-control"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Message content"
                  rows="3"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
