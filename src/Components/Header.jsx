import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, NotificationsNone, ExpandMore, ExpandLess } from "@mui/icons-material";
import { Avatar } from "@mui/material";

const Header = ({ toggleSidebar }) => {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Page Titles Mapping
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
    "/newsletter": "Newsletters",
    "/report": "Report",
    "/update-system": "UpdateSystem",
  };

  // Get the current page name
  const activePage = pageTitles[location.pathname] || "Not Found";

  // Toggle User Dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="header">
      {/* Sidebar Toggle Button */}
      <button className="hamburger" onClick={toggleSidebar}>
        <Menu fontSize="large" />
      </button>


      {/* Active Page Name */}
      <div>
      <h5 className="header__activePage">{activePage}</h5>
        <div className="header__notificationWrapper">
         {/* <p>SUPER ADMIN</p> */}
        </div>
      </div>

      {/* Right Section */}
      <div className="header__right">
        <div className="header__notificationWrapper">
          <NotificationsNone />
          <span className="header__notification">1</span>
        </div>

        {/* Avatar Section */}
        <div className="header__user" onClick={toggleDropdown}>
          <Avatar src="https://i.postimg.cc/vBGy3rS3/Screenshot-2024-11-25-145218.png" />
          {isDropdownOpen ? <ExpandLess /> : <ExpandMore />}
        </div>

        {/* User Dropdown Menu */}
        {isDropdownOpen && (
          <div className="header__dropdown">
            <p className="header__dropdownItem">Profile</p>
            <p className="header__dropdownItem">Logout</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
