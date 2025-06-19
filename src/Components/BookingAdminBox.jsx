import React, { useEffect, useState } from 'react'
import {
  Box,
  Stack,
  Typography,
  Chip,
  Avatar,
  Divider,
  CircularProgress,
  Paper,
  Tooltip,
  useTheme
} from '@mui/material'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import axios from 'axios'

dayjs.extend(relativeTime)

const statusColors = {
  Pending: 'warning',
  Confirmed: 'success',
  Cancelled: 'error',
  Completed: 'info'
}

function BookingCard ({ booking }) {
  const theme = useTheme()
  const { hotelDetails = {} } = booking
  const roomImage = hotelDetails.images?.[0] || ''
  return (
    <Paper
      elevation={3}
      sx={{
        mb: 3,
        borderRadius: 3,
        p: 3,
        bgcolor: '#fff',
        boxShadow: '0 6px 32px 0 rgba(30,41,59,0.06)'
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems='flex-start'
      >
        <Avatar
          src={roomImage}
          alt={hotelDetails.name}
          sx={{ width: 88, height: 68, borderRadius: 2, mr: 2, flexShrink: 0 }}
          variant='rounded'
        />
        <Box flex={1}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={1}
            alignItems={{ xs: 'flex-start', md: 'center' }}
            justifyContent='space-between'
          >
            <Typography
              variant='h6'
              fontWeight={700}
              color={theme.palette.secondary.main}
            >
              {hotelDetails.name || 'No Room Name'}
            </Typography>
            <Chip
              label={booking.status}
              color={statusColors[booking.status] || 'default'}
              size='small'
              sx={{ fontWeight: 600, fontSize: 14 }}
              variant={booking.status === 'Pending' ? 'outlined' : 'filled'}
            />
          </Stack>
          <Typography variant='body2' color='text.secondary' mt={0.5}>
            <b>Room Type:</b> {hotelDetails.alias}
          </Typography>
          <Stack direction='row' spacing={2} mt={1}>
            <Typography variant='body2'>
              <b>Check In:</b>{' '}
              {dayjs(booking.checkInDate).format('DD MMM YYYY, ddd')}
            </Typography>
            <Typography variant='body2'>
              <b>Check Out:</b>{' '}
              {dayjs(booking.checkOutDate).format('DD MMM YYYY, ddd')}
            </Typography>
          </Stack>
          <Stack direction='row' spacing={2} mt={1}>
            <Typography variant='body2'>
              <b>Guests:</b> {booking.guests}
            </Typography>
            <Typography variant='body2'>
              <b>Rooms:</b> {booking.rooms}
            </Typography>
            <Typography variant='body2'>
              <b>Nights:</b> {booking.nights}
            </Typography>
            <Typography variant='body2'>
              <b>Total:</b>{' '}
              <span
                style={{ color: theme.palette.success.dark, fontWeight: 600 }}
              >
                ₦{booking.totalPrice?.toLocaleString()}
              </span>
            </Typography>
          </Stack>
          <Stack direction='row' spacing={2} mt={1}>
            <Typography variant='body2'>
              <b>Booking ID:</b> {booking._id}
            </Typography>
            <Typography variant='body2'>
              <b>Pool:</b> {booking.pool}
            </Typography>
            <Typography variant='body2'>
              <b>User ID:</b> {booking.userId}
            </Typography>
          </Stack>
        </Box>
        <Box alignSelf='flex-start' mt={1}>
          <Tooltip title={dayjs(booking.createdAt).fromNow()}>
            <Typography variant='caption' color='text.secondary'>
              Booked On: {dayjs(booking.createdAt).format('DD MMM YYYY, HH:mm')}
            </Typography>
          </Tooltip>
        </Box>
      </Stack>
      <Divider sx={{ mt: 2, mb: 1 }} />
      <Typography variant='body2' color='text.secondary'>
        <b>Info:</b>{' '}
        <span
          dangerouslySetInnerHTML={{
            __html: hotelDetails.info || ''
          }}
        />
      </Typography>
    </Paper>
  )
}

export default function BookingAdminBox () {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios
      .get('https://bonserver-vic7.onrender.com/booking/bookings')
      .then(res => {
        // Sort by createdAt, newest first
        const sorted = Array.isArray(res.data)
          ? res.data
              .slice()
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          : []
        setBookings(sorted)
      })
      .catch(() => setBookings([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Box sx={{ p: { xs: 1, sm: 3 }, bgcolor: '#f6f7f9', minHeight: '100vh' }}>
      <Typography
        variant='h4'
        fontWeight={700}
        mb={4}
        sx={{
          letterSpacing: '.5px',
          background: '#000',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        All Bookings
      </Typography>
      {loading ? (
        <Stack alignItems='center' justifyContent='center' minHeight='30vh'>
          <CircularProgress color='secondary' thickness={4} />
        </Stack>
      ) : bookings.length === 0 ? (
        <Typography variant='body1' color='text.secondary'>
          No bookings found.
        </Typography>
      ) : (
        bookings.map(booking => (
          <BookingCard key={booking._id} booking={booking} />
        ))
      )}
    </Box>
  )
}
