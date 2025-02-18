import React, { useState, useEffect } from "react";
import { Edit, Visibility, Delete } from "@mui/icons-material";
import axios from "axios"; // For API calls
import { Modal, Box, Button, TextField, Pagination } from "@mui/material";
import * as XLSX from "xlsx"; // For Excel download

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Updated to 1-based page number
  const [userToEdit, setUserToEdit] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query

  // Fetch dummy users from JSONPlaceholder API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Use JSONPlaceholder for demo users (mocked data)
        const response = await axios.get("http://localhost:5001/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Paginate users
  const usersPerPage = 10;
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // View User Details
  const handleView = (id) => {
    alert(`Viewing details for user ID: ${users[0]._id}`);
  };

  // Edit User
  const handleEdit = (user) => {
    setUserToEdit(user);
    setModalOpen(true);
  };

  // Update User details
  const handleSave = () => {
    if (userToEdit) {
      axios.put(`http://localhost:5001/users/${userToEdit.id}`, userToEdit) // Mock API PUT request
        .then(() => {
          setUsers(users.map(user => (user.id === userToEdit.id ? userToEdit : user)));
          setModalOpen(false);
          alert("User updated successfully!");
        })
        .catch(error => {
          console.error("Error updating user:", error);
          alert("Failed to update user.");
        });
    }
  };

  // Delete User
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:5001/users/${users._id}`); // Mock API DELETE request
      setUsers(users.filter(user => user.id !== id)); // Remove user from state
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Excel download functionality
  const downloadExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(filteredUsers);
    XLSX.utils.book_append_sheet(wb, ws, "Users");
    XLSX.writeFile(wb, "users_data.xlsx");
  };

  return (
    <div className="userTable">
      <div className="userTable__header">
        <h2>Users</h2>
        <input 
          type="text" 
          placeholder="Search users..." 
          value={searchQuery} 
          onChange={handleSearchChange} 
        />
        <Button 
          variant="contained" 
          onClick={downloadExcel} 
          style={{ marginLeft: "10px" }}
        >
          Download Excel
        </Button>
      </div>

      <div className="table-container">
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>email</th>
                <th>Device</th>
                <th>Phone Number</th>
                <th>Date of Creation</th>
                <th>Country</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.username.split(" ")[0]}</td> {/* Assuming first name */}
                  <td>{user.email}</td>
                  <td>{user.deviceType}</td> {/* Assuming last name */}
                  <td>{user.phoneNumber}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString("en-US", {year: "numeric",month: "long",day: "numeric",})}</td>
                  <td>{user.userCountry}</td>
                  <td>
                    <span className={`status ${user.status === "Active" ? "active" : "inactive"}`}>
                      {"Active"}
                    </span>
                  </td>
                  <td className="actions">
                    <Visibility className="view" onClick={() => handleView(user.id)} />
                    <Edit className="edit" onClick={() => handleEdit(user)} />
                    <Delete className="delete" onClick={() => handleDelete(user.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <Pagination
          count={Math.ceil(filteredUsers.length / usersPerPage)} // Total number of pages
          page={currentPage} // Current page state
          onChange={handlePageChange} // Handler for page change
          variant="outlined" // Optional style choice
          shape="rounded" // Optional rounded edges for pagination buttons
          color="primary" // Optional color style for active page
        />
      </div>

      {/* Modal for Editing */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box className="modal-content">
          <h3>Edit User</h3>
          {userToEdit && (
            <div>
              <TextField
                label="First Name"
                value={userToEdit.firstName}
                onChange={(e) => setUserToEdit({ ...userToEdit, firstName: e.target.value })}
                fullWidth
              />
              <TextField
                label="Last Name"
                value={userToEdit.lastName}
                onChange={(e) => setUserToEdit({ ...userToEdit, lastName: e.target.value })}
                fullWidth
              />
              <TextField
                label="Email"
                value={userToEdit.email}
                onChange={(e) => setUserToEdit({ ...userToEdit, email: e.target.value })}
                fullWidth
              />
              <TextField
                label="Phone Number"
                value={userToEdit.phoneNumber}
                onChange={(e) => setUserToEdit({ ...userToEdit, phoneNumber: e.target.value })}
                fullWidth
              />
              <Button variant="contained" onClick={handleSave}>Save Changes</Button>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default UserTable;
