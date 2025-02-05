import { 
  AirplaneTicket, CalendarToday, CommitSharp, DeviceThermostatRounded, 
  Email, EmojiPeopleOutlined, ExpandLess, ExpandMore, Home, Hotel, 
  InputOutlined, Language, MobileFriendly, Newspaper, OutputTwoTone, 
  Payment, PeopleAltOutlined, Person, Report, RollerShadesTwoTone, 
  SettingsAccessibility, Update 
} from '@mui/icons-material';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);
  const [openDropdowns, setOpenDropdowns] = useState({
    dashboard: false,
    manageUsers: false
  });

  const handleClick = (path) => {
    setActivePath(path);
  };

  const toggleDropdown = (menu) => {
    setOpenDropdowns((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const links = [
    { path: "/dashboard", name: "Dashboard", icon: <Home />, category: "HOME", dropdown: true, submenu: [
        { path: "/dashboard/overview", name: "Overview" },
        { path: "/dashboard/analytics", name: "Analytics" }
    ] },
    { path: "/manage-role", name: "Manage Role", icon: <EmojiPeopleOutlined />, category: "ADMINISTRATION" },
    { path: "/manage-hotels", name: "Manage Hotels", icon: <Hotel />, category: "MANAGE HOTELS" },
    { path: "/schedule", name: "Schedule", icon: <CalendarToday />, category: "USER MANAGEMENT" },
    { path: "/manage-users", name: "Manage Users", icon: <Person />, category: "USER MANAGEMENT", dropdown: true, submenu: [
        { path: "/manage-users/active", name: "Active Users" },
        { path: "/manage-users/pending", name: "Pending Users" },
        { path: "/manage-users/banned", name: "Banned Users" }
    ] },
    { path: "/tickets", name: "Tickets", icon: <AirplaneTicket />, category: "USER MANAGEMENT" },
    { path: "/manage-referral", name: "Manage Referral", icon: <PeopleAltOutlined />, category: "USER MANAGEMENT" },
    { path: "/payments", name: "Payments", icon: <Payment />, category: "PAYMENT AND PAYOUT" },
    { path: "/deposit", name: "Deposit", icon: <InputOutlined />, category: "PAYMENT AND PAYOUT" },
    { path: "/withdrawal", name: "Withdrawal", icon: <OutputTwoTone />, category: "PAYMENT AND PAYOUT" },
    { path: "/gateway-settings", name: "Gateway Settings", icon: <RollerShadesTwoTone />, category: "SYSTEM SETTING" },
    { path: "/email-manager", name: "Email Manager", icon: <Email />, category: "SYSTEM SETTING" },
    { path: "/general-settings", name: "General Settings", icon: <SettingsAccessibility />, category: "SYSTEM SETTING" },
    { path: "/manage-language", name: "Manage Language", icon: <Language />, category: "SYSTEM SETTING" },
    { path: "/manage-theme", name: "Manage Theme", icon: <DeviceThermostatRounded />, category: "SYSTEM SETTING" },
    { path: "/commission-log", name: "Commission Log", icon: <CommitSharp />, category: "OTHERS" },
    { path: "/manage-mobile", name: "Manage Mobile", icon: <MobileFriendly />, category: "OTHERS" },
    { path: "/newsletter", name: "Newsletters", icon: <Newspaper />, category: "OTHERS" },
    { path: "/report", name: "Report", icon: <Report />, category: "OTHERS" },
    { path: "/update-system", name: "Update System", icon: <Update />, category: "OTHERS" },
  ];

  // Grouping links by category
  const groupedLinks = links.reduce((acc, link) => {
    acc[link.category] = acc[link.category] || [];
    acc[link.category].push(link);
    return acc;
  }, {});

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>

      <img 
        src="https://i.postimg.cc/vBGy3rS3/Screenshot-2024-11-25-145218.png" 
        alt="logo" 
        className="sidebar__img" 
      />

      <div className="sidebar__list">
        {Object.entries(groupedLinks).map(([category, links]) => (
          <div key={category}>
            <p className='sidebar__subhead'>{category}</p>
            {links.map((link) => (
              <React.Fragment key={link.path}>
                {/* If the link has a dropdown */}
                {link.dropdown ? (
                  <>
                    <div 
                      className={`sidebar__link ${openDropdowns[link.name.toLowerCase()] ? "open" : ""}`} 
                      onClick={() => toggleDropdown(link.name.toLowerCase())}
                    >
                      {link.icon} {link.name} 
                      {openDropdowns[link.name.toLowerCase()] ? <ExpandLess /> : <ExpandMore />}
                    </div>
                    {openDropdowns[link.name.toLowerCase()] && (
                      <div className="sidebar__submenu">
                        {link.submenu.map((sub) => (
                          <Link 
                            to={sub.path} 
                            key={sub.path} 
                            className={`sidebar__sublink ${activePath === sub.path ? "active" : ""}`}
                            onClick={() => handleClick(sub.path)}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link 
                    to={link.path} 
                    className={`sidebar__link ${activePath === link.path ? "active" : ""}`}
                    onClick={() => handleClick(link.path)}
                  >
                    {link.icon} {link.name}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
