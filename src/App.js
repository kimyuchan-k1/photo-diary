import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import PhotoList from './pages/PhotoList';
import SearchPhotos from './pages/SearchPhotos';
import Login from './pages/Login';
import Register from './pages/Register';
import axios from 'axios';
import Mypage from './pages/Mypage';
import Writepost from './pages/Writepost';
import UserList from './pages/UserList';
// import MessageModal from './components/MessageModal';

// Axios 기본 URL 설정
axios.defaults.baseURL = 'http://127.0.0.1:5000';
axios.defaults.withCredentials = true;

const App = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  useEffect(() => {
    //check if user is logged in
    axios
      .get('/auth/check', {})
      .then((response) => {
        if (response.status === 200) {
          setisLoggedIn(true);
        }
      })
      .catch(() => {
        setisLoggedIn(false);
      });
  }, []);

  return (
    <Router>
      <div>
        <NavBar isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} />
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route
            path="/login"
            element={<Login setisLoggedIn={setisLoggedIn} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<SearchPhotos />} />
          <Route path="/photos" element={<PhotoList />} />
          <Route path="/Mypage" element={<Mypage />} />
          <Route path="/write" element={<Writepost />} />
          <Route path="/users" element={<UserList />} />
          {/* <Route path="/Message" element={<MessageModal />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
