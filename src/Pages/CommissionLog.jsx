import React from 'react';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';

const CommissionLog = () => {
 
  return (
    <div className="dashboard">
      <div className="dashboard__sidebar">
        {/* sidebar */}
        <Sidebar />
      </div>
      <div className="dashboard__mainboard">
        {/* Header section */}
        <Header />
        </div>
      </div>
  );
};

export default CommissionLog;
