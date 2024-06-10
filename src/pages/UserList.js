import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { ListGroup } from 'react-bootstrap';


const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('users/list', {
          withCredentials: true,
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    // 시작하면 User리스트를 받아온다.
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User List</h1>

      <ListGroup>
        {users.map((user) => (
          <ListGroup.Item key={user.id}>{user.username}</ListGroup.Item>
        ))}
      </ListGroup>

    </div>
  );
};

export default UserList;

