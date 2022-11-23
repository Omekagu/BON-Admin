import { DriveEta, PeopleAlt, Settings, ZoomOutMap } from '@mui/icons-material';
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
            <ZoomOutMap />
            overview
          </div>
        </Link>
        <Link to="/dashboard">
          <div className="sidebar__link">
            <PeopleAlt /> users
          </div>
        </Link>
        <Link to="/dashboard">
          <div className="sidebar__link">
            <PeopleAlt /> riders
          </div>
        </Link>
        <Link to="/dashboard">
          <div className="sidebar__link">
            <DriveEta /> riders history
          </div>
        </Link>
        <Link to="/dashboard">
          <div className="sidebar__link">
            <Settings /> rides settings
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
