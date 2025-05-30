import React from 'react'
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

const bookingStatsData = {
  labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  datasets: [
    {
      label: 'Single room',
      data: [35, 38, 65, 62, 57, 56, 41],
      backgroundColor: '#A5B4FC',
      borderRadius: 6,
      barThickness: 16
    },
    {
      label: 'Family room',
      data: [41, 42, 48, 38, 34, 34, 31],
      backgroundColor: '#6366F1',
      borderRadius: 6,
      barThickness: 16
    }
  ]
}

const bookingStatsOptions = {
  responsive: true,
  plugins: {
    legend: { display: true, position: 'bottom' },
    title: { display: false }
  },
  scales: {
    x: {
      grid: { display: false }
    },
    y: {
      beginAtZero: true,
      ticks: { stepSize: 20 }
    }
  }
}

const visitorsTimeData = {
  labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  datasets: [
    {
      label: 'Yesterday',
      data: [200, 110, 250, 180, 300, 220, 210],
      fill: false,
      borderColor: '#A5B4FC',
      backgroundColor: '#A5B4FC',
      tension: 0.4,
      pointRadius: 3
    },
    {
      label: 'Today',
      data: [50, 80, 200, 260, 210, 310, 180],
      fill: false,
      borderColor: '#6366F1',
      backgroundColor: '#6366F1',
      tension: 0.4,
      pointRadius: 3
    }
  ]
}

const visitorsTimeOptions = {
  responsive: true,
  plugins: {
    legend: { display: true, position: 'bottom' },
    title: { display: false }
  },
  scales: {
    x: {
      grid: { display: false }
    },
    y: {
      beginAtZero: true,
      ticks: { stepSize: 100 }
    }
  }
}

const stats = [
  {
    icon: <FaRegCalendarCheck />,
    value: 254,
    label: 'Booking',
    color: '#ede9fe'
  },
  {
    icon: <FaSignInAlt />,
    value: 120,
    label: 'Check-in',
    color: '#e0f2fe'
  },
  {
    icon: <FaSignOutAlt />,
    value: 60,
    label: 'Check-out',
    color: '#fee2e2'
  },
  {
    icon: <FaBed />,
    value: 50,
    label: 'Stay now',
    color: '#d1fae5'
  }
]

const HotelDashboard = () => (
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
                <div className='hotel-dashboard__stat-value'>{stat.value}</div>
                <div className='hotel-dashboard__stat-label'>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='hotel-dashboard__feedback'>
        <div className='hotel-dashboard__feedback-inner'>
          <div className='hotel-dashboard__feedback-title'>Guest Feedback</div>
          <div className='hotel-dashboard__feedback-value'>75%</div>
          <div className='hotel-dashboard__feedback-desc'>
            Satisfaction rate
          </div>
          <div className='hotel-dashboard__feedback-image' />
        </div>
      </div>
    </div>

    <div className='hotel-dashboard__row hotel-dashboard__row--charts'>
      <div className='hotel-dashboard__chart-box'>
        <div className='hotel-dashboard__chart-header'>
          <span>Booking Statistics</span>
          <select>
            <option>Weekly</option>
          </select>
        </div>
        <Bar
          data={bookingStatsData}
          options={bookingStatsOptions}
          height={230}
        />
      </div>
      <div className='hotel-dashboard__chart-box'>
        <div className='hotel-dashboard__chart-header'>
          <span>Visitors time</span>
          <select>
            <option>Weekly</option>
          </select>
        </div>
        <Line
          data={visitorsTimeData}
          options={visitorsTimeOptions}
          height={230}
        />
      </div>
    </div>
  </div>
)

export default HotelDashboard
