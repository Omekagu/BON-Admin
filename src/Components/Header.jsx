import React from 'react';
import { useLocation } from 'react-router-dom';
import { NotificationsNone } from '@mui/icons-material';
import { Avatar } from '@mui/material';

const Header = () => {
  const location = useLocation();

  // Map paths to readable page names
  const pageTitles = {
        "/": "Login",
        "/dashboard": "DashBoard",
        "/manage-role": "ManageRole",
        "/manage-users": "ManagerUsers",
        "/manage-hotels": "ManageHotels",
        "/schedule": "Schedule",
        "/tickets": "Tickets",
        "/manage-referral": "ManageReferral",
        "/payments": "Payments",
        "/deposit": "Deposit",
        "/withdrawal": "Withdrawal",
        "/gateway-settings": "GatewaySettings",
        "/email-manager": "EmailManager",
        "/general-settings": "GeneralSettings",
        "/manage-language": "ManageLanguage",
        "/manage-theme": "ManageTheme",
        "/commission-log": "CommissionLog",
        "/manage-mobile": "ManageMobile",
        "/newsletter": "Newsletter",
        "/report": "Report",
        "/update-system": "UpdateSystem",
  };

  // Get the current page name or default to "Dashboard"
  const activePage = pageTitles[location.pathname] || "Dashboard";


  return (
    <div className="header">
      <h3 className='header__activePage'>{activePage}</h3>
      <div className="header__right">
        <NotificationsNone />
        <span className="header__notification">1</span>
<div className="header__name">
<h5>Super Admin</h5>
</div>
        
        <Avatar />
      </div>
    </div>
  );
};

export default Header;
