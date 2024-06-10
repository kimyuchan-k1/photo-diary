import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, ListGroup } from 'react-bootstrap';

const MyPage = () => {
  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('posts/myposts', {
          withCredentials: true,
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`posts/delete/${postId}`, {
        withCredentials: true,
      });
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEdit = (post) => {
    setEditPost(post);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `posts/update/${editPost.id}`,
        {
          title: editPost.title,
          content: editPost.content,
        },
        { withCredentials: true }
      );
      setPosts(
        posts.map((post) => (post.id === editPost.id ? editPost : post))
      );
      setEditPost(null);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditPost({ ...editPost, [name]: value });
  };

  return (
    <div>
      <h1>My Page</h1>
      <ListGroup>
        {posts.map((post) => (
          <ListGroup.Item key={post.id}>
            <h5>{post.title}</h5>
            <p>{post.content}</p>
            <Button onClick={() => handleEdit(post)}>수정</Button>
            <Button onClick={() => handleDelete(post.id)}>삭제</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      {editPost && (
        <Form onSubmit={handleUpdate}>
          <Form.Group>
            <Form.Control
              type="text"
              name="title"
              value={editPost.title}
              onChange={handleChange}
              placeholder="Title"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={3}
              name="content"
              value={editPost.content}
              onChange={handleChange}
              placeholder="Content"
            />
          </Form.Group>
          <Button type="submit">Update</Button>
          <Button onClick={() => setEditPost(null)}>Cancel</Button>
        </Form>
      )}
    </div>
  );
};

export default MyPage;