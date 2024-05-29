import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import PhotoList from './pages/PhotoList';
import SearchPhotos from './pages/SearchPhotos';
import Login from './pages/Login';
import Register from './pages/Register';

import axios from 'axios';

// Axios 기본 URL 설정
axios.defaults.baseURL = 'http://127.0.0.1:5000';


const App = () => {
    return (
        <Router>
            <div>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/search" element={<SearchPhotos />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
