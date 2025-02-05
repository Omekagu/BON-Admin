import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
// import { WordExport } from "js-word-export";  // Optional for Word export

const TableContainer = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    // Fetch dummy users (Replace with your API if needed)
    const fetchedUsers = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phoneNumber: "+1234567890",
        dateOfCreation: "2022-01-01",
        country: "USA",
        status: "Active"
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        phoneNumber: "+1234567891",
        dateOfCreation: "2022-02-01",
        country: "Canada",
        status: "Inactive"
      },
      // Add more users here
    ];
    setUsers(fetchedUsers);
    setFilteredUsers(fetchedUsers);
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = users.filter(user => 
      user.firstName.toLowerCase().includes(value.toLowerCase()) ||
      user.lastName.toLowerCase().includes(value.toLowerCase()) ||
      user.email.toLowerCase().includes(value.toLowerCase()) ||
      user.phoneNumber.includes(value)
    );
    setFilteredUsers(filtered);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredUsers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");
    XLSX.writeFile(wb, "users.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("User List", 10, 10);
    let y = 20;
    filteredUsers.forEach(user => {
      doc.text(`ID: ${user.id} | Name: ${user.firstName} ${user.lastName} | Email: ${user.email} | Phone: ${user.phoneNumber} | Country: ${user.country} | Status: ${user.status}`, 10, y);
      y += 10;
    });
    doc.save("users.pdf");
  };

//   const exportToWord = () => {
//     const document = new WordExport();
//     document.addText("User List\n", { bold: true, size: 18 });
//     filteredUsers.forEach(user => {
//       document.addText(`ID: ${user.id} | Name: ${user.firstName} ${user.lastName} | Email: ${user.email} | Phone: ${user.phoneNumber} | Country: ${user.country} | Status: ${user.status}`);
//     });
//     document.save("users.docx");
//   };

  return (
    <div className="user-table-container">
      {/* Search input */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search by name, email, or phone"
        className="search-input"
      />

      {/* Table */}
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date of Creation</th>
            <th>Country</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.dateOfCreation}</td>
              <td>{user.country}</td>
              <td>{user.status}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Export Buttons */}
      <div className="export-buttons">
        <button onClick={exportToExcel}>Export to Excel</button>
        <button onClick={exportToPDF}>Export to PDF</button>
        {/* <button onClick={exportToWord}>Export to Word</button> */}
      </div>
    </div>
  );
};

export default TableContainer;
