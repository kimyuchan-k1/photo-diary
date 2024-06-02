import React, { useState } from 'react';
import axios from 'axios';
import PhotoList from './PhotoList';
import { Button, Container, Row, Col, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = ({ isLoggedIn }) => {

  const users = ['User1', 'User2', 'User3', 'User4']

  return (
    <div>
      <h1>포토 다이어리</h1>
      {isLoggedIn ? (
        <div>
          <PhotoList />
          <Link to="/write">
            <Button variant="primary" className="position-fixed" style={{ bottom: '20px', right: '20px' }}>
              글쓰기  
            </Button>
          </Link>
        </div>
      ) : (
        <div>
          <Container fluid>
        <Row>
          <Col md={5} className="bg-light p-3">
            <h4>User List</h4>
            <ListGroup>
              {users.map((user,index) => (
                <ListGroup.Item key={index}>{user}</ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
        </div>
      )}
    </div>
  );
};

export default Home;
