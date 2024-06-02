import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Writepost() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [preview, setPreview] = useState(null);
  
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result); // 미리보기 URL 설정
    };
    reader.readAsDataURL(file);
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
        navigate('/');
      }
    } catch (error) {
      setError('Error uploading photo');
      setSuccess('');
    }
  };

  return (
    <Container className="mt-3">
      <h2>글쓰기</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <Form onSubmit={handleSubmit}>

        <Form.Group controlId="keyword">
          <Form.Label>키워드</Form.Label>
          <Form.Control
            type="text"
            placeholder="키워드를 입력하세요"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="content">
          <Form.Label>내용</Form.Label>
          <Form.Control
            as ="textarea"
            rows = {5}
            placeholder="내용을 입력하세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="image">
          <Form.Label>사진 업로드</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
        </Form.Group>

        {preview && (
          <div className="mt-3">
            <h5>미리보기</h5>
            <img src={preview} alt="미리보기" style={{ maxWidth: '100%' }} />
          </div>
        )}
          <Button variant="primary" type="submit" className="w-100 mt-3">
           게시하기
            </Button>
      </Form>
    </Container>
  );
}

export default Writepost;