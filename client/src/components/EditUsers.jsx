import React, { useState, useEffect } from 'react';
import axios from 'axios';


function EditUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('/getUsers'); // Assuming '/getUsers' is your API endpoint
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchUsers();
  }, []);

  const handleEdit = (userId) => {
    // Handle edit action for user with userId
    console.log("Edit user with ID:", userId);
  };

  const handleDelete = (userId) => {
    // Handle delete action for user with userId
    console.log("Delete user with ID:", userId);
  };

  return (
    <div>
      <div className="container-user">
       
        <table className="user-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Language</th>
              <th>Level</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.language}</td>
                <td>{user.level}</td>
                <td>
                  <button className="edit" onClick={() => handleEdit(user._id)}>Edit</button>
                </td>
                <td>
                  <button className="delete" onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EditUsers;
