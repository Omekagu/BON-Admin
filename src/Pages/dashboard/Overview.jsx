import React, { useState } from 'react';
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import UserTable from '../../Components/UserTable';
import { DashboardChart } from '../../Components/DashboardChart';


export const Overview = () => {
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
          <DashboardChart/>
          <UserTable/>
        </div>
        </div>
      </div>
  )
}



