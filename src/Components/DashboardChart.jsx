import React from 'react'
import { FaChartBar, FaUsers, FaDollarSign } from "react-icons/fa";
import { Grid, Paper, Typography } from '@mui/material';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register required components for Line Chart and Pie Chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement, // This is the missing component
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const DashboardChart = () => {
  return (
    <div className="dashboard">
    <main className="dashboard__main-content">
      <div className="dashboard__cards">
        <div className="dashboard__card customers">
          <FaUsers className="dashboard__icon" color='#000'/>
          <h3>1,587</h3>
          <p>Customers</p>
        </div>
        <div className="dashboard__card revenue" >
          <FaDollarSign className="dashboard__icon" color='#000'/>
          <h3>&#8358;46,785</h3>
          <p>Revenue</p>
        </div>
        <div className="dashboard__card growth">
          <FaChartBar className="dashboard__icon" color='#000'/>
          <h3>15.9%</h3>
          <p>Growth Rate</p>
        </div>
      </div>
      <div className="dashboard__cards">
        <div className="dashboard__card customers">
          <FaUsers className="dashboard__icon" color='#000' />
          <h3>1,587</h3>
          <p>Customers</p>
        </div>
        <div className="dashboard__card revenue">
          <FaDollarSign className="dashboard__icon" color='#000' />
          <h3>&#8358;46,785</h3>
          <p>Revenue</p>
        </div>
        <div className="dashboard__card growth">
          <FaChartBar className="dashboard__icon" color='#000' />
          <h3>15.9%</h3>
          <p>Growth Rate</p>
        </div>
        <div className="dashboard__card growth">
          <FaChartBar className="dashboard__icon" color='#000'/>
          <h3>15.9%</h3>
          <p>Growth Rate</p>
        </div>
      </div>
      

      

      <div className="dashboard__charts">
      <Grid container spacing={3}>
        {/* Line Chart */}
        <Grid item xs={12} sm={6} md={6}>
          <Paper elevation={3} className="dashboard__chart-box">
            <Typography variant="h6" gutterBottom>Yearly Sales Report</Typography>
            <Line 
              data={{
                labels: ["2015", "2016", "2017"],
                datasets: [{
                  label: "Sales",
                  data: [17562, 19800, 22500],
                  backgroundColor: "rgba(76, 175, 80, 0.2)",
                  borderColor: "#4CAF50",
                  borderWidth: 2,
                  fill: true,
                }],
              }}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: 'Sales over the years',
                    font: { size: 16 },
                  },
                  legend: {
                    position: 'top',
                    labels: {
                      font: {
                        size: 14,
                      },
                    },
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                    },
                  },
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: '#e0e0e0',
                    },
                  },
                },
              }}
            />
          </Paper>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} sm={6} md={6}>
          <Paper elevation={3} className="dashboard__chart-box">
            <Typography variant="h6" gutterBottom>Sales Analytics</Typography>
            <Pie 
              data={{
                labels: ["In-Store Sales", "Online Sales"],
                datasets: [{
                  data: [30, 70],
                  backgroundColor: ["#2196F3", "#FF5722"],
                  borderWidth: 1,
                  borderColor: "#fff",
                }],
              }}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: 'Sales Distribution',
                    font: { size: 16 },
                  },
                  legend: {
                    position: 'top',
                    labels: {
                      font: {
                        size: 14,
                      },
                    },
                  },
                },
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
    </main>
  </div>
  )
}
