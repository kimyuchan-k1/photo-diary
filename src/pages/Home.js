import React, { useState } from 'react';
import axios from 'axios';
import PhotoList from './PhotoList';
import { Button, Container, Row, Col, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserList from './UserList';

const Home = ({ isLoggedIn }) => {
  return (
    <div>
      <h1>포토 다이어리</h1>
      {isLoggedIn ? (
        <div>
          <PhotoList />
          <Link to="/write">
            <Button
              variant="primary"
              className="position-fixed"
              style={{ bottom: '20px', right: '20px' }}
            >
              글쓰기
            </Button>
          </Link>
          <UserList />
        </div>
      ) : (
        <div>
          <UserList />
        </div>
      )}
    </div>
  );
};

export default Home;
