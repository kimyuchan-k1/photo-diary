// import React, { useState } from 'react';
// import { Container, Button, Card, Row, Col } from 'react-bootstrap';

// function Mypage() {
//   // 내가 쓴 게시물 리스트
//   const [posts, setPosts] = useState([
//     { id: 1, title: '첫 번째 게시물', content: '첫 번째 게시물 내용' },
//     { id: 2, title: '두 번째 게시물', content: '두 번째 게시물 내용' },
//   ]);

//   const handleEditPost = (postId) => {
//     // 게시물 수정 기능 추가
//     console.log(`Edit post with id ${postId}`);
//   };

//   const handleDeletePost = (postId) => {
//     // 게시물 삭제 기능 추가
//     console.log(`Delete post with id ${postId}`);
//   };

//   // 받은 메시지 리스트
//   const [messages, setMessages] = useState([
//     { id: 1, sender: 'User1', content: '첫 번째 메시지 내용' },
//     { id: 2, sender: 'User2', content: '두 번째 메시지 내용' },
//   ]);

//   const handleReplyMessage = (messageId) => {
//     // 메시지 답장 기능 추가
//     console.log(`Reply to message with id ${messageId}`);
//   };

//   return (
//     <Container className="mt-5">
//       <h1 className="mb-4">마이페이지</h1>
//       {/* 내가 쓴 게시물 섹션 */}
//       <Row>
//         <Col>
//           <h2>내가 쓴 게시물</h2>
//           {posts.map((post) => (
//             <Card key={post.id} className="my-3">
//               <Card.Body className="d-flex justify-content-between">
//                 <div>
//                   <Card.Title>{post.title}</Card.Title>
//                   <Card.Text>{post.content}</Card.Text>
//                 </div>
//                 <div>
//                   <Button
//                     variant="primary"
//                     onClick={() => handleEditPost(post.id)}
//                   >
//                     수정하기
//                   </Button>{' '}
//                   <Button
//                     variant="danger"
//                     onClick={() => handleDeletePost(post.id)}
//                   >
//                     삭제하기
//                   </Button>
//                 </div>
//               </Card.Body>
//             </Card>
//           ))}
//         </Col>
//       </Row>

//       {/* 받은 메시지 섹션 */}
//       <Row>
//         <Col>
//           <h2>받은 메시지</h2>
//           {messages.map((message) => (
//             <Card key={message.id} className="my-3">
//               <Card.Body className="d-flex justify-content-between">
//                 <div>
//                   <Card.Title>From: {message.sender}</Card.Title>
//                   <Card.Text>{message.content}</Card.Text>
//                 </div>
//                 <Button
//                   variant="primary"
//                   onClick={() => handleReplyMessage(message.id)}
//                 >
//                   답장하기
//                 </Button>
//               </Card.Body>
//             </Card>
//           ))}
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default Mypage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyPage = () => {
  const [photos, setPhotos] = useState([]);
  const [editPhoto, setEditPhoto] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('photos/myphotos', {
          withCredentials: true,
        });
        setPhotos(response.data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };
    fetchPhotos();
  }, []);

  const handleDelete = async (photoId) => {
    try {
      await axios.delete(`photos/delete/${photoId}`, {
        withCredentials: true,
      });
      setPhotos(photos.filter((photo) => photo.id !== photoId));
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  const handleEdit = (photo) => {
    setEditPhoto(photo);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `photos/update/${editPhoto.id}`,
        {
          description: editPhoto.description,
          keywords: editPhoto.keywords,
        },
        { withCredentials: true }
      );
      setPhotos(
        photos.map((photo) => (photo.id === editPhoto.id ? editPhoto : photo))
      );
      setEditPhoto(null);
    } catch (error) {
      console.error('Error updating photo:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditPhoto({ ...editPhoto, [name]: value });
  };

  return (
    <div>
      <h1>My Page</h1>
      <ul>
        {photos.map((photo) => (
          <li key={photo.id}>
            <img
              src={`http://127.0.0.1:5000/${photo.image_url}`}
              alt={photo.description}
            />
            <p>{photo.description}</p>
            <p>{photo.keywords}</p>
            <button onClick={() => handleEdit(photo)}>수정</button>
            <button onClick={() => handleDelete(photo.id)}>삭제</button>
          </li>
        ))}
      </ul>
      {editPhoto && (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            name="description"
            value={editPhoto.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <input
            type="text"
            name="keywords"
            value={editPhoto.keywords}
            onChange={handleChange}
            placeholder="Keywords"
          />
          <button type="submit">Update</button>
          <button onClick={() => setEditPhoto(null)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default MyPage;
