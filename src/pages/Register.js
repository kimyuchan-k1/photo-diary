import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/register', {
        username,
        password,
      });
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      setError('Error registering user');
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h1 className="mb-4">회원가입</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleRegister}>
        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Label>ID</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </Form.Group>
        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </Form.Group>
        <Button variant="dark" type="submit" className="w-100" style={{color: "white"}}>
          회원가입
        </Button>
      </Form>
    </Container>
  );
};

export default Register;