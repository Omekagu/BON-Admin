import React, { useEffect, useState } from 'react'
import {
  FaRegCalendarCheck,
  FaSignInAlt,
  FaSignOutAlt,
  FaBed
} from 'react-icons/fa'
import { Bar, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import axios from 'axios'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

// const getDayLabel = dateStr => {
//   const date = new Date(dateStr)
//   return date.toLocaleDateString(undefined, { weekday: 'short' })
// }

// const getDateLabel = dateStr => {
//   const date = new Date(dateStr)
//   return date.toLocaleDateString()
// }

const HotelDashboard = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get('https://bonserver-production.up.railway.app/booking/bookings')
      .then(response => {
        setBookings(Array.isArray(response.data) ? response.data : [])
      })
      .catch(() => setBookings([]))
      .finally(() => setLoading(false))
  }, [])
  if (loading) return <div>Loading...</div>
  if (!bookings.length) return <div>No bookings found</div>
  // Stats
  const totalBookings = bookings.length
  const checkIns = bookings.filter(
    b => new Date(b.checkInDate).toDateString() === new Date().toDateString()
  ).length
  const checkOuts = bookings.filter(
    b => new Date(b.checkOutDate).toDateString() === new Date().toDateString()
  ).length
  const stayNow = bookings.filter(b => {
    const now = new Date()
    return new Date(b.checkInDate) <= now && now <= new Date(b.checkOutDate)
  }).length

  const stats = [
    {
      icon: <FaRegCalendarCheck />,
      value: totalBookings,
      label: 'Booking',
      color: '#ede9fe'
    },
    {
      icon: <FaSignInAlt />,
      value: checkIns,
      label: 'Check-in',
      color: '#e0f2fe'
    },
    {
      icon: <FaSignOutAlt />,
      value: checkOuts,
      label: 'Check-out',
      color: '#fee2e2'
    },
    {
      icon: <FaBed />,
      value: stayNow,
      label: 'Stay now',
      color: '#d1fae5'
    }
  ]

  // --- BAR CHART: Bookings per Hotel ---
  const hotels = {}
  bookings.forEach(b => {
    if (!hotels[b.hotelName]) hotels[b.hotelName] = 0
    hotels[b.hotelName] += 1
  })
  const barData = {
    labels: Object.keys(hotels),
    datasets: [
      {
        label: 'Bookings',
        data: Object.values(hotels),
        backgroundColor: '#6366F1',
        borderRadius: 8,
        barThickness: 28
      }
    ]
  }
  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Bookings per Hotel' }
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, ticks: { stepSize: 1 } }
    }
  }

  // --- LINE CHART: Bookings per Day (last 7 days) ---
  const today = new Date()
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(today.getDate() - (6 - i))
    return d
  })
  const dayLabels = last7.map(d =>
    d.toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  )
  const bookingsPerDay = last7.map(
    day =>
      bookings.filter(
        b => new Date(b.createdAt).toDateString() === day.toDateString()
      ).length
  )
  const lineData = {
    labels: dayLabels,
    datasets: [
      {
        label: 'Bookings',
        data: bookingsPerDay,
        fill: false,
        borderColor: '#6366F1',
        backgroundColor: '#6366F1',
        tension: 0.4,
        pointRadius: 4
      }
    ]
  }
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Bookings per Day (7d)' }
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, ticks: { stepSize: 1 } }
    }
  }

  // --- TOTAL REVENUE ---
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0)

  return (
    <div className='hotel-dashboard'>
      <div className='hotel-dashboard__row'>
        <div className='hotel-dashboard__overview'>
          <h3>Reservation Overview</h3>
          <div className='hotel-dashboard__stats'>
            {stats.map((stat, i) => (
              <div
                className='hotel-dashboard__stat'
                style={{ background: stat.color }}
                key={i}
              >
                <span className='hotel-dashboard__stat-icon'>{stat.icon}</span>
                <div>
                  <div className='hotel-dashboard__stat-value'>
                    {stat.value}
                  </div>
                  <div className='hotel-dashboard__stat-label'>
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='hotel-dashboard__feedback'>
          <div className='hotel-dashboard__feedback-inner'>
            <div className='hotel-dashboard__feedback-title'>Total Revenue</div>
            <div className='hotel-dashboard__feedback-value'>
              ₦{totalRevenue.toLocaleString()}
            </div>
            <div className='hotel-dashboard__feedback-desc'>
              All time booking revenue
            </div>
            <div className='hotel-dashboard__feedback-image' />
          </div>
        </div>
      </div>
      <div className='hotel-dashboard__row hotel-dashboard__row--charts'>
        <div className='hotel-dashboard__chart-box'>
          <div className='hotel-dashboard__chart-header'>
            <span>Bookings per Hotel</span>
          </div>
          <Bar data={barData} options={barOptions} height={230} />
        </div>
        <div className='hotel-dashboard__chart-box'>
          <div className='hotel-dashboard__chart-header'>
            <span>Bookings per Day (last 7d)</span>
          </div>
          <Line data={lineData} options={lineOptions} height={230} />
        </div>
      </div>
    </div>
  )
}

export default HotelDashboard
