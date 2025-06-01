import React from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Chip
} from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'
import GroupIcon from '@mui/icons-material/Group'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts'

// Dummy data for charts and lists
const bookings = [
  {
    hotel: 'Queens Hotel',
    date: '28 - 29 May',
    user: 'Mark Wayne',
    ago: '3 days ago',
    img: 'https://randomuser.me/api/portraits/men/31.jpg'
  },
  {
    hotel: 'Hotel Lavilla',
    date: '01 June',
    user: 'Ena Willis',
    ago: '10 days ago',
    img: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    hotel: 'Poshly Inn',
    date: '28 May',
    user: 'K. Parker',
    ago: '12 days ago',
    img: 'https://randomuser.me/api/portraits/men/45.jpg'
  },
  {
    hotel: 'Stay Happy',
    date: '02 - 05 June',
    user: 'Melisa Wade',
    ago: '5 days ago',
    img: 'https://randomuser.me/api/portraits/women/46.jpg'
  }
]

const topClients = [
  { name: 'Mark Wayne', img: 'https://randomuser.me/api/portraits/men/31.jpg' },
  {
    name: 'Ena Willis',
    img: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  { name: 'K. Parker', img: 'https://randomuser.me/api/portraits/men/45.jpg' }
]

const earningsStats = [
  { name: 'Jan', value: 0.8 },
  { name: 'Feb', value: 1.5 },
  { name: 'Mar', value: 1.2 },
  { name: 'Apr', value: 1 },
  { name: 'May', value: 1.3 },
  { name: 'Jun', value: 1.35 },
  { name: 'Jul', value: 1.1 }
]

const pieData = [{ value: 60 }, { value: 40 }]
const pieColors = ['#FDBA4F', '#23243A']

export default function AnalyticsDashboard () {
  return (
    <Box className='dashboard-dark-root'>
      {/* Top KPI Cards */}
      <Grid container spacing={2} className='dashboard-dark-top'>
        <Grid item xs={6} md={3}>
          <Card className='dashboard-dark-kpi kpi-orange'>
            <CardContent>
              <Typography className='dashboard-dark-kpi-title'>2.8B</Typography>
              <Typography className='dashboard-dark-kpi-label'>
                Total Earnings
              </Typography>
              <InsertEmoticonIcon className='dashboard-dark-kpi-icon' />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card className='dashboard-dark-kpi kpi-blue'>
            <CardContent>
              <Typography className='dashboard-dark-kpi-title'>1.5M</Typography>
              <Typography className='dashboard-dark-kpi-label'>
                Happy Users
              </Typography>
              <GroupIcon className='dashboard-dark-kpi-icon' />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card className='dashboard-dark-kpi kpi-purple'>
            <CardContent>
              <Typography className='dashboard-dark-kpi-title'>10K</Typography>
              <Typography className='dashboard-dark-kpi-label'>
                Employees
              </Typography>
              <GroupIcon className='dashboard-dark-kpi-icon' />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card className='dashboard-dark-kpi kpi-green'>
            <CardContent>
              <Typography className='dashboard-dark-kpi-title'>12K</Typography>
              <Typography className='dashboard-dark-kpi-label'>
                New Bookings
              </Typography>
              <EventAvailableIcon className='dashboard-dark-kpi-icon' />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content */}
      <Grid container spacing={2} className='dashboard-dark-main'>
        {/* Latest Hotel Bookings */}
        <Grid item xs={12} md={3}>
          <Card className='dashboard-dark-panel'>
            <CardContent>
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                mb={1}
              >
                <Typography fontWeight={700} color='#000'>
                  Latest Hotel Bookings
                </Typography>
                <Chip
                  label='May, 2021'
                  size='small'
                  sx={{ bgcolor: '#21233A', color: '#fff' }}
                />
              </Box>
              <Box display='flex' alignItems='center' gap={1} mb={2}>
                <Button
                  size='small'
                  variant='contained'
                  className='dashboard-dark-date-btn'
                >
                  28.05.2021
                </Button>
                <Typography color='#666' fontSize={18}>
                  -
                </Typography>
                <Button
                  size='small'
                  variant='contained'
                  className='dashboard-dark-date-btn'
                >
                  05.06.2021
                </Button>
              </Box>
              <List dense>
                {bookings.map((b, i) => (
                  <ListItem key={i} alignItems='flex-start' sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar
                        src={b.img}
                        alt={b.hotel}
                        sx={{ width: 38, height: 38 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography
                          sx={{ color: '#fff', fontWeight: 600, fontSize: 15 }}
                        >
                          {b.hotel}{' '}
                          <span className='dashboard-dark-hotel-date'>
                            {b.date}
                          </span>
                        </Typography>
                      }
                      secondary={
                        <Typography
                          component='span'
                          color='#b1b6c6'
                          fontSize={13}
                        >
                          {b.user}{' '}
                          <span className='dashboard-dark-hotel-ago'>
                            {b.ago}
                          </span>
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Earnings Stats and Pie */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            {/* Earnings Stats */}
            <Grid item xs={12} md={7}>
              <Card className='dashboard-dark-panel'>
                <CardContent>
                  <Typography fontWeight={700} color='white' mb={1}>
                    Earning stats on all bookings
                  </Typography>
                  <Box className='dashboard-dark-chart-tabs'>
                    <Button
                      size='small'
                      variant='contained'
                      className='dashboard-dark-tab-btn selected'
                    >
                      Monthly
                    </Button>
                    <Button
                      size='small'
                      variant='contained'
                      className='dashboard-dark-tab-btn'
                    >
                      Yearly
                    </Button>
                  </Box>
                  <ResponsiveContainer width='100%' height={86}>
                    <LineChart data={earningsStats}>
                      <XAxis
                        dataKey='name'
                        axisLine={false}
                        tick={{ fill: '#888' }}
                      />
                      <YAxis hide />
                      <Tooltip
                        contentStyle={{
                          borderRadius: 12,
                          background: '#21233A'
                        }}
                      />
                      <Line
                        type='monotone'
                        dataKey='value'
                        stroke='#FDBA4F'
                        strokeWidth={3}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                  <Typography
                    mt={1}
                    sx={{ color: '#FDBA4F', fontWeight: 700, fontSize: 16 }}
                  >
                    February{' '}
                    <span style={{ fontWeight: 400, color: '#fff' }}>1.5M</span>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            {/* Pie/Circular Chart */}
            <Grid item xs={12} md={5}>
              <Card className='dashboard-dark-panel'>
                <CardContent>
                  <Typography fontWeight={700} color='white'>
                    Monthly increased amount
                  </Typography>
                  <Box
                    height={110}
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                  >
                    <ResponsiveContainer width='90%' height={100}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          dataKey='value'
                          innerRadius={35}
                          outerRadius={45}
                          startAngle={90}
                          endAngle={-270}
                        >
                          {pieData.map((entry, i) => (
                            <Cell key={i} fill={pieColors[i]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <Box className='dashboard-dark-pie-center'>
                      <Typography
                        variant='h6'
                        sx={{ color: '#fff', fontWeight: 700 }}
                      >
                        60%
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    sx={{ color: '#b1b6c6', fontSize: 13, textAlign: 'center' }}
                  >
                    Calculated with respect to per 100 bookings
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Calculate Monthly Report */}
        <Grid item xs={12} md={3}>
          <Card className='dashboard-dark-panel' sx={{ minHeight: 210 }}>
            <CardContent>
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                mb={1}
              >
                <Typography fontWeight={700} color='white'>
                  Calculate monthly report based on each segment
                </Typography>
                <Chip
                  label='May, 2021'
                  size='small'
                  sx={{ bgcolor: '#21233A', color: '#fff' }}
                />
              </Box>
              <Box display='flex' flexWrap='wrap' gap={1} mb={1}>
                {[
                  'Hotels',
                  'Flights',
                  'Packaged Holidays',
                  'Trains',
                  'Buses',
                  'Cabs',
                  'Others'
                ].map((seg, i) => (
                  <Button
                    key={i}
                    size='small'
                    className='dashboard-dark-segment-btn'
                  >
                    {seg}
                  </Button>
                ))}
              </Box>
              <Box display='flex' gap={3} mt={2} mb={1}>
                <Box>
                  <Typography className='dashboard-dark-report-title'>
                    2.8B
                  </Typography>
                  <Typography className='dashboard-dark-report-label'>
                    Total Properties
                  </Typography>
                </Box>
                <Box>
                  <Typography className='dashboard-dark-report-title'>
                    5k
                  </Typography>
                  <Typography className='dashboard-dark-report-label'>
                    New Bookings
                  </Typography>
                </Box>
                <Box>
                  <Typography className='dashboard-dark-report-title'>
                    2k
                  </Typography>
                  <Typography className='dashboard-dark-report-label'>
                    New Customers
                  </Typography>
                </Box>
                <Box>
                  <Typography className='dashboard-dark-report-title'>
                    1.2M
                  </Typography>
                  <Typography className='dashboard-dark-report-label'>
                    Transactions
                  </Typography>
                </Box>
              </Box>
              <Box display='flex' justifyContent='flex-end'>
                <Button
                  variant='contained'
                  className='dashboard-dark-generate-btn'
                >
                  Generate Report
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Bottom Panels */}
        <Grid item xs={12} md={3}>
          <Card className='dashboard-dark-panel'>
            <CardContent>
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                mb={1}
              >
                <Typography fontWeight={700} color='white'>
                  Top valued clients
                </Typography>
                <Chip
                  label='May, 2021'
                  size='small'
                  sx={{ bgcolor: '#21233A', color: '#fff' }}
                />
              </Box>
              <Box display='flex' gap={2} alignItems='center' mt={2}>
                {topClients.map((client, i) => (
                  <Box key={i} textAlign='center'>
                    <Avatar
                      src={client.img}
                      sx={{ width: 54, height: 54, mx: 'auto', mb: 0.3 }}
                    />
                    <Typography
                      sx={{ color: '#fff', fontWeight: 600, fontSize: 14 }}
                    >
                      {client.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card className='dashboard-dark-panel'>
            <CardContent>
              <Typography fontWeight={700} color='white' mb={2}>
                Newly introduced Flights
              </Typography>
              <Divider sx={{ bgcolor: '#353554', mb: 1 }} />
              <Box display='flex' alignItems='center' gap={2}>
                <Box>
                  <Typography
                    variant='h4'
                    sx={{ color: '#FDBA4F', fontWeight: 900 }}
                  >
                    583
                  </Typography>
                  <Typography sx={{ color: '#b1b6c6' }}>
                    Nationwide in 25 states
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: '#4F8CFF', width: 38, height: 38 }}>
                  <CalendarMonthIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className='dashboard-dark-panel dashboard-dark-helpdesk-panel'>
            <CardContent>
              <Typography variant='h6' fontWeight={700} color='#fff' mb={1}>
                Covid Help Desk
              </Typography>
              <Typography sx={{ color: '#FFF', mb: 1, fontSize: 15 }}>
                We value our employees, following plans have been introduced to
                protect our employees.
              </Typography>
              <Box className='dashboard-dark-help-links'>
                <Box>
                  <a href='/' className='dashboard-dark-help-link'>
                    Health Insurance
                  </a>
                  <a href='/' className='dashboard-dark-help-link'>
                    Medicaid
                  </a>
                </Box>
                <Box>
                  <a href='/' className='dashboard-dark-help-link'>
                    Pension Plan
                  </a>
                  <a href='/' className='dashboard-dark-help-link'>
                    Family Protection
                  </a>
                </Box>
              </Box>
              <Divider sx={{ bgcolor: '#fff', my: 1, opacity: 0.2 }} />
              <Typography sx={{ color: '#fff', fontSize: 15 }}>
                For help, our toll free no. - 00180042300
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
