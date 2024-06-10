import React, { useState, useEffect } from 'react';
import axios from 'axios';
const MyPage = () => {
  const [photos, setPhotos] = useState([]);
  const [messages, setMessages] = useState([]);
  const [editPhoto, setEditPhoto] = useState(null);

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

    const fetchMessages = async () => {
      try {
        const response = await axios.get('messages/received', {
          withCredentials: true,
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
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

  return (
    <div>
      <h1>My Page</h1>
      <ul>
        {photos.map((photo) => (
          <li key={photo.id}>
            <img
              src={`http://127.0.0.1:5000/${photo.image_url}`}
              alt={photo.description}
            />
            <p>{photo.description}</p>
            <p>{photo.keywords}</p>
            <button onClick={() => handleEdit(photo)}>수정</button>
            <button onClick={() => handleDelete(photo.id)}>삭제</button>
          </li>
        ))}
      </ul>
      {editPhoto && (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            name="description"
            value={editPhoto.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <input
            type="text"
            name="keywords"
            value={editPhoto.keywords}
            onChange={handleChange}
            placeholder="Keywords"
          />
          <button type="submit">Update</button>
          <button onClick={() => setEditPhoto(null)}>Cancel</button>
        </form>
      )}

      <h2>받은 메세지</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <p>From: {message.sender_id}</p>
            <p>{message.content}</p>
            <p>{message.timestamp}</p>
            {/* <button onClick={() => handleMessage(message.sender_id)}>
              Reply
            </button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyPage;
