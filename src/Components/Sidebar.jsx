import { DriveEta, Home, PeopleAlt, Settings, ZoomOutMap } from '@mui/icons-material';
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  // const onActive = document.querySelector.sidebar__link;

  return (
    <div className="sidebar">
      <img src="./image/wt logo.png" alt="logo" className="sidebar__img" />

      <div className="sidebar__list">
        <Link to="/dashboard">
          <div className="sidebar__link active">
            <Home /> 
            Dashboard
          </div>
        </Link>
        <Link to="/dashboard">
          <div className="sidebar__link">
            <PeopleAlt /> Opportunities
          </div>
        </Link>
        <Link to="/dashboard">
          <div className="sidebar__link">
            <PeopleAlt /> Room and rates
          </div>
        </Link>
        <Link to="/dashboard">
          <div className="sidebar__link">
            <DriveEta /> Marketing
          </div>
        </Link>
        <Link to="/dashboard">
          <div className="sidebar__link">
            <Settings /> Reservations
          </div>
        </Link>
        <Link to="/dashboard">
          <div className="sidebar__link">
            <Settings /> Guest relations
          </div>
        </Link>
        <Link to="/dashboard">
          <div className="sidebar__link">
            <Settings /> Payments
          </div>
        </Link>
        <Link to="/dashboard">
          <div className="sidebar__link">
            <Settings /> Property details
          </div>
        </Link>
        <Link to="/dashboard">
          <div className="sidebar__link">
            <Settings /> Revenue mangement
          </div>
        </Link>
        <Link to="/dashboard">
          <div className="sidebar__link">
            <Settings /> performance
          </div>
        </Link>
        <Link to="/dashboard">
          <div className="sidebar__link">
            <Settings /> Administration
          </div>
        </Link>
        <Link to="/dashboard">
          <div className="sidebar__link">
            <Settings /> Help and support
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
