import React, { useState } from 'react';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';

const GeneralSettings = () => {
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
          <h2>Welcome to Dashboard</h2>
        </div>
        </div>
      </div>
  );
};

export default GeneralSettings;

