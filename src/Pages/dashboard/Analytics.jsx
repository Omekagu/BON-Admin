import React, { useState } from 'react'
import Sidebar from '../../Components/Sidebar'
import Header from '../../Components/Header'
import AnalyticsDashboard from '../../Components/AnalyticsDashboard'

const Analytics = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev)

  return (
    <div className='dashboard'>
      <div className='dashboard__sidebar'>
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>
      <div className={`dashboard__mainboard ${isSidebarOpen ? '' : 'shifted'}`}>
        <Header toggleSidebar={toggleSidebar} />
        <div className='dashboard__content'>{<AnalyticsDashboard />}</div>
      </div>
    </div>
  )
}

export default Analytics
