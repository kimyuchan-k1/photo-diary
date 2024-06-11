import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import MessageModal from '../components/MessageModal';

const PhotoList = () => {
  const [photos, setPhotos] = useState([]);
  const [messageRecipient, setMessageRecipient] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('/photos', { withCredentials: true });
        setPhotos(response.data);
      } catch (error) {
        console.error('Error fetching photos', error);
      }
    };

    fetchPhotos();
  }, []);

  const handleMessage = (recipientId) => {
    setMessageRecipient(recipientId);
    console.log(recipientId);
  };

  const handleModalClose = () => {
    setMessageRecipient(null);
  };

  const handleModalSuccess = () => {
    // 메시지 전송 성공 후 로직
    alert('Message sent successfully!');
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">게시물</h1>
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
                  className="btn btn-primary"
                  onClick={() => handleMessage(photo.user_id)}
                >
                  전송
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

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

export default PhotoList;
