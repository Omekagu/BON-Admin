import React, { useState } from 'react'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'
import HotelDashboard from '../Components/HotelDashboard'
import CustomerSchedule from '../Components/CustomerSchedule'

const DashBoard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev)

  // Responsive: collapse sidebar on small screens
  // You can use a media query hook or CSS only
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
        <div className='dashboard__content'>
          <HotelDashboard />
          <CustomerSchedule />
          {/* <UserTable /> */}
        </div>
      </div>
    </div>
  )
}

export default DashBoard
