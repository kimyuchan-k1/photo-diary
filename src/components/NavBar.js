import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css'; // 추가된 CSS 파일

const NavBar = ({ isLoggedIn, setisLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        '/auth/logout',
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        setisLoggedIn(false);
        navigate('/');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const [searchKeyword, setSearchKeyword] = useState('');
  const handleSearchInputChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?keyword=${searchKeyword}`);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand text-white" to="/">
        홈페이지
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          {!isLoggedIn && (
            <>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/login">
                  로그인
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/register">
                  회원가입
                </Link>
              </li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li className="nav-item">
                <Form className="d-flex ms-auto" onSubmit={handleSearch}>
                  <FormControl
                    type="search"
                    placeholder="Search Keyword"
                    className="mr-2"
                    aria-label="Search"
                    value={searchKeyword}
                    onChange={handleSearchInputChange}
                  />
                  <Button type="submit" variant="outline-light">
                    검색
                  </Button>
                </Form>
              </li>
              <li>
                <Link className="nav-link text-white" to="/Mypage">
                  마이페이지
                </Link>
              </li>

              <li className="nav-item">
                <button
                  className="btn btn-outline-danger"
                  onClick={handleLogout}
                >
                  로그아웃
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
