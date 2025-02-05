import { 
  AirplaneTicket, CalendarToday, CommitSharp, DeviceThermostatRounded, 
  Email, EmojiPeopleOutlined, Home, Hotel, InputOutlined, 
  Language, MobileFriendly, Newspaper, OutputTwoTone, Payment, 
  PeopleAltOutlined, Person, Report, RollerShadesTwoTone, 
  SettingsAccessibility, Update 
} from '@mui/icons-material';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);
  

  // const toggleSidebar = () => setIsOpen(!isOpen);
  const handleClick = (path) => {
    setActivePath(path);
  };

  const links = [
    { path: "/dashboard", name: "Dashboard", icon: <Home />, category: "HOME" },
    { path: "/manage-role", name: "Manage Role", icon: <EmojiPeopleOutlined />, category: "ADMINISTRATION" },
    { path: "/manage-hotels", name: "Manage Hotels", icon: <Hotel />, category: "MANAGE HOTELS" },
    { path: "/schedule", name: "Schedule", icon: <CalendarToday />, category: "USER MANAGEMENT" },
    { path: "/manage-users", name: "Manage Users", icon: <Person />, category: "USER MANAGEMENT" },
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
    { path: "/newsletter", name: "Newsletter Subscriber", icon: <Newspaper />, category: "OTHERS" },
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
              <Link 
                to={link.path} 
                key={link.path} 
                className={`sidebar__link ${activePath === link.path ? "active" : ""}`}
                onClick={() => handleClick(link.path)}
              >
                {link.icon} {link.name}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
