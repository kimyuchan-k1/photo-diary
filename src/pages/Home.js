import React, { useState } from 'react';
import axios from 'axios';
import PhotoList from './PhotoList';

const Home = ({ isLoggedIn }) => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', description);
    formData.append('keywords', keywords);

    try {
      const response = await axios.post('/photos/upload', formData, {
        withCredentials: true,
      });
      if (response.status === 201) {
        setSuccess('Photo uploaded successfully!');
        setError('');
      }
    } catch (error) {
      setError('Error uploading photo');
      setSuccess('');
    }
  };

  return (
    <div>
      <h1>포토 다이어리</h1>
      {isLoggedIn ? (
        <div>
          <h2>Upload a Photo</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
          <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="Keywords"
            />
            <button type="submit">Upload</button>
          </form>
          <PhotoList />
        </div>
      ) : (
        <p>로그인 하세요.</p>
      )}
    </div>
  );
};

export default Home;
