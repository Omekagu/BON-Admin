import React, { useState } from 'react';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import PropertyList from '../Components/PropertyList';

const ManageHotels = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar default open

  // Toggle Sidebar Function
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="dashboard">
      <div className="dashboard__sidebar">
        {/* sidebar */}
        <Sidebar isOpen={isSidebarOpen} />
      </div>
      <div className={`dashboard__mainboard ${isSidebarOpen ? "shifted" : ""}`}>
        {/* Header section */}
        <Header toggleSidebar={toggleSidebar} />
        <div className="dashboard__content">
        <PropertyList/>
        </div>
        </div>
      </div>
  );
};

export default ManageHotels;

