import React, { useState } from "react";
import { Search, FilterList } from "@mui/icons-material";
import { Avatar, Button, Menu, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const users = [
  { name: "Gbenga Dada", role: "Administrator", date: "Fri, Feb 14", initials: "GD", color: "#FF66B2" },
  { name: "Gift Agubueze", role: "Property user", date: "Tue, Jan 21", initials: "GA", color: "#FF6666" },
  { name: "Sandra Ogbahor", role: "Administrator", date: "Fri, Nov 10", initials: "SO", color: "#33CC99" },
  { name: "Voyager McLean", role: "Administrator", date: "Wed, Dec 11", initials: "VM", color: "#6699FF" },
];

const UserManagement = () => {
  const [filterAnchor, setFilterAnchor] = useState(null);
  const [roleFilter, setRoleFilter] = useState("");
  const [propertyFilter, setPropertyFilter] = useState("");

  // Open Filter Menu
  const handleOpenFilter = (event) => setFilterAnchor(event.currentTarget);
  const handleCloseFilter = () => setFilterAnchor(null);

  return (
    <div className="user-management">
      <h2>All users for BON Hotel Abuja</h2>
      {/* Buttons */}
      <div className="button-group">
        <Button className="filter-btn" onClick={handleOpenFilter} startIcon={<FilterList />}>
          Filter
        </Button>
        <Button className="invite-btn" variant="contained">Invite User</Button>
      </div>
      {/* Search Bar */}
      <div className="search-bar">
        <Search className="search-icon" />
        <input type="text" placeholder="Search by name" />
      </div>

      {/* User Table */}
      <div className="user-table">
        <div className="table-header">
          <span>User</span>
          <span>Role</span>
          <span>Date Added</span>
          <span>Actions</span>
        </div>

        {users.map((user, index) => (
          <div key={index} className="user-row">
            <div className="user-info">
              <Avatar sx={{ bgcolor: user.color }}>{user.initials}</Avatar>
              <span>{user.name}</span>
            </div>
            <span>{user.role}</span>
            <span>{user.date}</span>
            <button className="action-btn">⋮</button>
          </div>
        ))}
      </div>

     

      {/* Filter Menu */}
      <Menu anchorEl={filterAnchor} open={Boolean(filterAnchor)} onClose={handleCloseFilter}>
        <MenuItem>
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Administrator">Administrator</MenuItem>
              <MenuItem value="Property user">Property User</MenuItem>
            </Select>
          </FormControl>
        </MenuItem>

        <MenuItem>
          <FormControl fullWidth>
            <InputLabel>Property</InputLabel>
            <Select value={propertyFilter} onChange={(e) => setPropertyFilter(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="BON Hotel Abuja">BON Hotel Abuja</MenuItem>
            </Select>
          </FormControl>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserManagement;
