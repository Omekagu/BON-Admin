import React, { useState, useEffect } from "react";
import { Edit, Visibility, Delete } from "@mui/icons-material";
import axios from "axios"; // For API calls
import { Modal, Box, Button, TextField } from "@mui/material";
import ReactPaginate from "react-paginate";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [userToEdit, setUserToEdit] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch dummy users from JSONPlaceholder API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Use JSONPlaceholder for demo users (mocked data)
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        const usersWithFakeData = response.data.map((user) => ({
          ...user,
          phoneNumber: "123-456-7890",  // Fake phone number
          country: "USA",               // Fake country
          dateOfCreation: new Date().toISOString(),
          status: "Active",             // Fake status
        }));
        setUsers(usersWithFakeData);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Paginate users
  const usersPerPage = 5;
  const paginatedUsers = users.slice(currentPage * usersPerPage, (currentPage + 1) * usersPerPage);

  // Handle page change
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  // View User Details
  const handleView = (id) => {
    alert(`Viewing details for user ID: ${id}`);
  };

  // Edit User
  const handleEdit = (user) => {
    setUserToEdit(user);
    setModalOpen(true);
  };

  // Update User details
  const handleSave = () => {
    if (userToEdit) {
      axios.put(`https://jsonplaceholder.typicode.com/users/${userToEdit.id}`, userToEdit) // Mock API PUT request
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
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`); // Mock API DELETE request
      setUsers(users.filter(user => user.id !== id)); // Remove user from state
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };

  return (
    <div className="userTable">
      <div className="userTable__header">
        <h2>Users List</h2>
        <input type="text" placeholder="Search users..." />
      </div>

      <div className="table-container">
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Date of Creation</th>
                <th>Country</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name.split(" ")[0]}</td> {/* Assuming first name */}
                  <td>{user.name.split(" ")[1]}</td> {/* Assuming last name */}
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{new Date(user.dateOfCreation).toLocaleDateString()}</td>
                  <td>{user.country}</td>
                  <td>
                    <span className={`status ${user.status === "Active" ? "active" : "inactive"}`}>
                      {user.status}
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
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          breakLabel={"..."}
          pageCount={Math.ceil(users.length / usersPerPage)}
          onPageChange={handlePageClick}
          containerClassName={"pagination__container"}
          activeClassName={"active"}
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
