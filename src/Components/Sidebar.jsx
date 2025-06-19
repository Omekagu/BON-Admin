import {
  AirplaneTicket,
  CalendarToday,
  CommitSharp,
  DeviceThermostatRounded,
  Email,
  EmojiPeopleOutlined,
  ExpandLess,
  ExpandMore,
  Home,
  Hotel,
  InputOutlined,
  Language,
  MobileFriendly,
  Newspaper,
  OutputTwoTone,
  Payment,
  PeopleAltOutlined,
  Person,
  Report,
  RollerShadesTwoTone,
  SettingsAccessibility,
  Update
} from '@mui/icons-material'
import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation()
  const [activePath, setActivePath] = useState(location.pathname)
  const [openDropdowns, setOpenDropdowns] = useState({
    dashboard: false,
    manageUsers: false
  })

  // Responsive: close sidebar on route change (mobile)
  useEffect(() => {
    setActivePath(location.pathname)
    if (window.innerWidth <= 768 && onClose) onClose()
    // eslint-disable-next-line
  }, [location.pathname])

  // Close sidebar when window resizes above mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && onClose) onClose()
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
    // eslint-disable-next-line
  }, [])

  const toggleDropdown = menu => {
    setOpenDropdowns(prev => ({ ...prev, [menu]: !prev[menu] }))
  }

  const links = [
    {
      path: '/dashboard',
      name: 'Dashboard',
      icon: <Home />,
      category: 'HOME',
      dropdown: true,
      submenu: [
        { path: '/dashboard', name: 'Overview' },
        { path: '/dashboard/analytics', name: 'Analytics' }
      ]
    },
    {
      path: '/manage-users',
      name: 'Manage Users',
      icon: <Person />,
      category: 'USER MANAGEMENT',
      dropdown: true,
      submenu: [
        { path: '/manage-user/users', name: 'App Users' },
        { path: '/manage-user/booking', name: 'Hotel Bookings' },
        { path: '/manage-user/banned', name: 'Banned Users' }
      ]
    },
    {
      path: '/manage-role',
      name: 'Manage Role',
      icon: <EmojiPeopleOutlined />,
      category: 'ADMINISTRATION'
    },
    {
      path: '/manage-hotels',
      name: 'Manage Hotels',
      icon: <Hotel />,
      category: 'MANAGE HOTELS'
    },
    {
      path: '/schedule',
      name: 'Schedule',
      icon: <CalendarToday />,
      category: 'USER MANAGEMENT'
    },

    {
      path: '/tickets',
      name: 'Tickets',
      icon: <AirplaneTicket />,
      category: 'USER MANAGEMENT'
    },
    {
      path: '/manage-referral',
      name: 'Manage Referral',
      icon: <PeopleAltOutlined />,
      category: 'USER MANAGEMENT'
    },
    {
      path: '/payments',
      name: 'Payments',
      icon: <Payment />,
      category: 'PAYMENT AND PAYOUT'
    },
    {
      path: '/deposit',
      name: 'Deposit',
      icon: <InputOutlined />,
      category: 'PAYMENT AND PAYOUT'
    },
    {
      path: '/withdrawal',
      name: 'Withdrawal',
      icon: <OutputTwoTone />,
      category: 'PAYMENT AND PAYOUT'
    },
    {
      path: '/gateway-settings',
      name: 'Gateway Settings',
      icon: <RollerShadesTwoTone />,
      category: 'SYSTEM SETTING'
    },
    {
      path: '/email-manager',
      name: 'Email Manager',
      icon: <Email />,
      category: 'SYSTEM SETTING'
    },
    {
      path: '/general-settings',
      name: 'General Settings',
      icon: <SettingsAccessibility />,
      category: 'SYSTEM SETTING'
    },
    {
      path: '/manage-language',
      name: 'Manage Language',
      icon: <Language />,
      category: 'SYSTEM SETTING'
    },
    {
      path: '/manage-theme',
      name: 'Manage Theme',
      icon: <DeviceThermostatRounded />,
      category: 'SYSTEM SETTING'
    },
    {
      path: '/commission-log',
      name: 'Commission Log',
      icon: <CommitSharp />,
      category: 'OTHERS'
    },
    {
      path: '/manage-mobile',
      name: 'Manage Mobile',
      icon: <MobileFriendly />,
      category: 'OTHERS'
    },
    {
      path: '/newsletter',
      name: 'Newsletters',
      icon: <Newspaper />,
      category: 'OTHERS'
    },
    { path: '/report', name: 'Report', icon: <Report />, category: 'OTHERS' },
    {
      path: '/update-system',
      name: 'Update System',
      icon: <Update />,
      category: 'OTHERS'
    }
  ]

  // Grouping links by category
  const groupedLinks = links.reduce((acc, link) => {
    acc[link.category] = acc[link.category] || []
    acc[link.category].push(link)
    return acc
  }, {})

  // Hamburger: show/hide sidebar on mobile
  const [showSidebar, setShowSidebar] = useState(isOpen)

  useEffect(() => {
    setShowSidebar(isOpen)
  }, [isOpen])

  // const Hamburger = ({ onClick, isOpen }) => (
  //   <button className='hamburger' onClick={onClick} aria-label='Toggle sidebar'>
  //     <span
  //       style={isOpen ? { transform: 'rotate(45deg) translateY(8px)' } : {}}
  //     />
  //     <span style={isOpen ? { opacity: 0 } : {}} />
  //     <span
  //       style={isOpen ? { transform: 'rotate(-45deg) translateY(-8px)' } : {}}
  //     />
  //   </button>
  // )
  // Overlay click to close (on mobile)
  const Overlay = () =>
    showSidebar && window.innerWidth <= 768 ? (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1199,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.13)'
        }}
        onClick={onClose}
      />
    ) : null

  return (
    <>
      <Overlay />
      <div className={`sidebar ${showSidebar ? 'open' : 'closed'}`}>
        <div className='sidebar__logo'>
          <img
            src='https://i.postimg.cc/vBGy3rS3/Screenshot-2024-11-25-145218.png'
            alt='logo'
            className='sidebar__img'
          />

          {/* <Hamburger /> */}
        </div>
        <div className='sidebar__list'>
          {Object.entries(groupedLinks).map(([category, links]) => (
            <div key={category}>
              <p className='sidebar__subhead'>{category}</p>
              {links.map(link => (
                <React.Fragment key={link.path}>
                  {/* If the link has a dropdown */}
                  {link.dropdown ? (
                    <>
                      <div
                        className={`sidebar__link ${
                          openDropdowns[link.name.toLowerCase()] ? 'open' : ''
                        }`}
                        onClick={() => toggleDropdown(link.name.toLowerCase())}
                        tabIndex={0}
                        role='button'
                        aria-expanded={
                          openDropdowns[link.name.toLowerCase()]
                            ? 'true'
                            : 'false'
                        }
                      >
                        {link.icon}{' '}
                        <p className='sidebar__name'>{link.name} </p>
                        {openDropdowns[link.name.toLowerCase()] ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )}
                      </div>
                      {openDropdowns[link.name.toLowerCase()] && (
                        <div className='sidebar__submenu open'>
                          {link.submenu.map(sub => (
                            <Link
                              to={sub.path}
                              key={sub.path}
                              className={`sidebar__sublink ${
                                activePath === sub.path ? 'active' : ''
                              }`}
                              onClick={() => ''}
                            >
                              <p className='sidebar__subname'>{sub.name} </p>
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={link.path}
                      className={`sidebar__link ${
                        activePath === link.path ? 'active' : ''
                      }`}
                      onClick={() => ''}
                    >
                      {link.icon} <p className=''>{link.name} </p>
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Sidebar
