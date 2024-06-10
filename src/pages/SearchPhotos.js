import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

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
    <Container className="mt-5">
      <h1>Search Results for "{keyword}"</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Row>
        {photos.map((photo) => (
          <Col md={4} key={photo.id} className="mb-4">
            <div className="card h-100">
              <img
                src={`http://127.0.0.1:5000/uploads/${photo.image_url}`}
                className="card-img-top"
                alt={photo.description}
              />
              <div className="card-body">
                <h5 className="card-title">{photo.description}</h5>
                <p className="card-text">{photo.keywords}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SearchPhotos;