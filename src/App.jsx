import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.scss";

const App = () => {
  const [users, setUsers] = useState([]);
  const [firstname, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [editUserId, setEditUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      firstname,
      lastName,
      email,
    };
    try {
      if (editUserId) {
        await axios.put(`http://localhost:3000/users/${editUserId}`, newUser);
        setEditUserId(null);
      } else {
        await axios.post("http://localhost:3000/users", newUser);
      }
      fetchUsers();
      setFirstName("");
      setLastName("");
      setEmail("");
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleEdit = (user) => {
    setEditUserId(user.id);
    setFirstName(user.firstname);
    setLastName(user.lastName);
    setEmail(user.email);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>#ID</h2>
        <input
          type="text"
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
          className="el"
          placeholder="First Name"
          required
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="el"
          placeholder="Last Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="el"
          placeholder="Email"
          required
        />
        <button type="submit" className="submit">
          {editUserId ? "Edit" : "Add"}
        </button>
      </form>
      <div className="Users">
        {users.map((user) => (
          <div key={user.id} className="user">
            <p className="userId">{user.id}</p>
            <p className="el">{user.firstname}</p>
            <p className="el">{user.lastName}</p>
            <p className="el">{user.email}</p>
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
