import { NotificationsNone } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import React from 'react';

const Header = () => {
  return (
    <div className="header">
      <h3>overview</h3>
      <div className="header__right">
        <NotificationsNone />
        <span className="header__notification">1</span>

        <Avatar />
        <h5 className="header__name">Admin staff 1</h5>
      </div>
    </div>
  );
};

export default Header;
