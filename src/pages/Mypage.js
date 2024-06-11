import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import MessageModal from '../components/MessageModal';
const MyPage = () => {
  const [photos, setPhotos] = useState([]);
  const [editPhoto, setEditPhoto] = useState(null);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [messageRecipient, setMessageRecipient] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('photos/myphotos', {
          withCredentials: true,
        });
        setPhotos(response.data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };
    fetchPhotos();

    const fetchReceivedMessages = async () => {
      try {
        const response = await axios.get('messages/received', {
          withCredentials: true,
        });
        setReceivedMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchReceivedMessages();

    const fetchSentMessages = async () => {
      try {
        const response = await axios.get('messages/sent', {
          withCredentials: true,
        });
        setSentMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchSentMessages();
  }, []);

  const handleDelete = async (photoId) => {
    try {
      await axios.delete(`photos/delete/${photoId}`, {
        withCredentials: true,
      });
      setPhotos(photos.filter((photo) => photo.id !== photoId));
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  const handleEdit = (photo) => {
    setEditPhoto(photo);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `photos/update/${editPhoto.id}`,
        {
          description: editPhoto.description,
          keywords: editPhoto.keywords,
        },
        { withCredentials: true }
      );
      setPhotos(
        photos.map((photo) => (photo.id === editPhoto.id ? editPhoto : photo))
      );
      setEditPhoto(null);
    } catch (error) {
      console.error('Error updating photo:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditPhoto({ ...editPhoto, [name]: value });
  };

  const handleMessage = (recipientId) => {
    setMessageRecipient(recipientId);
  };

  const handleModalClose = () => {
    setMessageRecipient(null);
  };

  const handleModalSuccess = () => {
    // 메시지 전송 후 성공 시 로직 (필요 시 추가)
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/messages/delete/${messageId}`, {
        withCredentials: true,
      });
      setSentMessages(
        sentMessages.filter((message) => message.id !== messageId)
      );
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">마이페이지</h1>
      <div className="row">
        {photos.map((photo) => (
          <div className="col-md-4 mb-4" key={photo.id}>
            <div className="card h-100">
              <img
                src={`http://localhost:5000/${photo.image_url}`}
                className="card-img-top"
                alt={photo.description}
                style={{ maxHeight: '300px' }} // 이미지의 최대 높이 설정
              />
              <div className="card-body">
                <h5 className="card-title">{photo.description}</h5>
                <p className="card-text">{photo.keywords}</p>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleEdit(photo)}
                >
                  수정
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(photo.id)}
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editPhoto && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">사진 수정</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setEditPhoto(null)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleUpdate}>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      name="description"
                      value={editPhoto.description}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="keywords">Keywords</label>
                    <input
                      type="text"
                      className="form-control"
                      id="keywords"
                      name="keywords"
                      value={editPhoto.keywords}
                      onChange={handleChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setEditPhoto(null)}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <h2 className="mt-5">받은 메시지</h2>
      <ul className="list-group">
        {receivedMessages.map((message) => (
          <li className="list-group-item" key={message.id}>
            <p>From: {message.sender_id}</p>
            <p>{message.content}</p>
            <p>{message.timestamp}</p>
            <button
              className="btn btn-primary"
              onClick={() => handleMessage(message.sender_id)}
            >
              답장
            </button>
          </li>
        ))}
      </ul>

      <h2 className="mt-5">전송한 메시지</h2>
      <ul className="list-group">
        {sentMessages.map((message) => (
          <li className="list-group-item" key={message.id}>
            <p>To: {message.recipient_id}</p>
            <p>{message.content}</p>
            <p>{message.timestamp}</p>
            <button
              className="btn btn-danger"
              onClick={() => handleDeleteMessage(message.id)}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>

      {messageRecipient && (
        <MessageModal
          recipientId={messageRecipient}
          onClose={handleModalClose}
          onSuccess={handleModalSuccess}
        />
      )}
    </div>
  );
};

export default MyPage;
