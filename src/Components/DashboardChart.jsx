import React from 'react'
import { FaChartBar, FaUsers, FaDollarSign } from 'react-icons/fa'
import { Grid, Paper, Box } from '@mui/material'
import { Line, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
)

export const DashboardChart = () => {
  // Professional Line Chart Data
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 15000, 14000, 17500, 18500, 16500, 20000, 21000],
        borderColor: '#7f53ac',
        backgroundColor: ctx =>
          ctx.chart
            ? `linear-gradient(180deg, #7f53ac 0%, #a63932 100%)`
            : '#7f53ac',
        fill: true,
        tension: 0.4,
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#7f53ac'
      },
      {
        label: 'Bookings',
        data: [9000, 10500, 11500, 13000, 12500, 13500, 15000, 15500],
        borderColor: '#f77307',
        backgroundColor: ctx =>
          ctx.chart
            ? `linear-gradient(180deg, #f77307 0%, #fae8d2 100%)`
            : '#f77307',
        fill: false,
        borderDash: [6, 8],
        tension: 0.4,
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#f77307'
      }
    ]
  }

  // Professional Line Chart Options
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#222', font: { size: 15, weight: 'bold' } }
      },
      title: {
        display: true,
        text: 'Monthly Revenue & Bookings',
        font: { size: 18, weight: 'bold', family: 'inherit' },
        color: '#232323',
        padding: { top: 10, bottom: 20 }
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#fff',
        borderColor: '#a63932',
        borderWidth: 1,
        titleColor: '#a63932',
        bodyColor: '#232323',
        bodyFont: { weight: 'bold' }
      }
    },
    scales: {
      x: {
        ticks: { color: '#6d6d6d', font: { size: 13 } },
        grid: { color: 'rgba(166,57,50,0.07)' }
      },
      y: {
        beginAtZero: true,
        ticks: { color: '#6d6d6d', font: { size: 13 } },
        grid: { color: 'rgba(127,83,172,0.10)' }
      }
    }
  }

  // Pro Pie Chart Data
  const pieData = {
    labels: ['Direct', 'Referral', 'Social', 'Organic'],
    datasets: [
      {
        data: [38, 24, 18, 20],
        backgroundColor: [
          'rgba(127,83,172,0.92)',
          'rgba(246,115,7,0.85)',
          'rgba(166,57,50,0.85)',
          'rgba(100,221,187,0.85)'
        ],
        borderColor: '#fff',
        borderWidth: 2,
        hoverOffset: 8
      }
    ]
  }

  // Pro Pie Chart Options
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#232323',
          font: { size: 15, weight: 'bold' },
          padding: 18
        }
      },
      title: {
        display: true,
        text: 'Booking Source Breakdown',
        color: '#232323',
        font: { size: 18, weight: 'bold' },
        padding: { top: 10, bottom: 18 }
      },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#a63932',
        bodyColor: '#232323',
        bodyFont: { weight: 'bold' },
        borderColor: '#a63932',
        borderWidth: 1
      }
    }
  }

  return (
    <div className='dashboard'>
      <main className='dashboard__main-content'>
        {/* Cards Row */}
        <div className='dashboard__cards'>
          <div className='dashboard__card customers'>
            <FaUsers className='dashboard__icon' color='#000' />
            <h3>1,587</h3>
            <p>Customers</p>
          </div>
          <div className='dashboard__card revenue'>
            <FaDollarSign className='dashboard__icon' color='#000' />
            <h3>&#8358;46,785</h3>
            <p>Revenue</p>
          </div>
          <div className='dashboard__card growth'>
            <FaChartBar className='dashboard__icon' color='#000' />
            <h3>15.9%</h3>
            <p>Growth Rate</p>
          </div>
        </div>

        {/* Charts */}
        <div className='dashboard__charts'>
          <Grid container spacing={3}>
            {/* Pro Line Chart */}
            <Grid item xs={12} sm={12} md={7}>
              <Paper elevation={3} className='dashboard__chart-box'>
                <Box sx={{ minHeight: 360 }}>
                  <Line data={lineData} options={lineOptions} />
                </Box>
              </Paper>
            </Grid>

            {/* Pro Pie Chart */}
            <Grid item xs={12} sm={12} md={5}>
              <Paper elevation={3} className='dashboard__chart-box'>
                <Box sx={{ minHeight: 360 }}>
                  <Pie data={pieData} options={pieOptions} />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </main>
    </div>
  )
}
