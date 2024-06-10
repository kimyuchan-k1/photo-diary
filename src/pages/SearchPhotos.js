import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const SearchPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState('');

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const keyword = query.get('keyword');

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(`/photos/search?keyword=${keyword}`, {
          withCredentials: true,
        });
        setPhotos(response.data);
        setError('');
      } catch (error) {
        setError('Error fetching photos');
        setPhotos([]);
      }
    };
    fetchPhotos();
  }, [keyword]);

  return (
    <div>
      <h1>Search Results for "{keyword}"</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {photos.map((photo) => (
          <li key={photo.id}>
            <img
              src={`http://127.0.0.1:5000/uploads/${photo.image_url}`}
              alt={photo.description}
            />
            <p>{photo.description}</p>
            <p>{photo.keywords}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPhotos;
