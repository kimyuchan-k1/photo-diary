import React from 'react';
import PhotoList from './PhotoList';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserList from './UserList';

const Home = ({ isLoggedIn }) => {
  return (
    <Container className="mt-5">
      <h1 className="mb-4">포토 다이어리</h1>
      {isLoggedIn ? (
        <div>
          <UserList />
          <PhotoList />
          <Link to="/write">
            <Button
              variant="dark" // 버튼 색상을 검은색으로 설정
              className="position-fixed"
              style={{ bottom: '20px', right: '20px', color: 'white' }} // 글씨색을 흰색으로 설정
            >
              글쓰기
            </Button>
          </Link>
        </div>
      ) : (
        <div>
          <UserList />
        </div>
      )}
    </Container>
  );
};

export default Home;
