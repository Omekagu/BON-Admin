import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Chip,
  InputAdornment,
  Avatar,
  Tooltip,
  useTheme,
  CircularProgress,
  alpha
} from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import SearchIcon from '@mui/icons-material/Search'
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import axios from 'axios'
import { styled } from '@mui/material/styles'
import '@fontsource/plus-jakarta-sans/400.css'
import '@fontsource/plus-jakarta-sans/700.css'

dayjs.extend(relativeTime)

const statusColors = {
  Pending: 'warning',
  Confirmed: 'success',
  Cancelled: 'error',
  Completed: 'info'
}

const FuturisticDataGrid = styled(DataGrid)(({ theme }) => ({
  borderRadius: 16,
  border: 'none',
  background: theme.palette.background.paper,
  boxShadow: '0 6px 32px 0 rgba(30,41,59,0.08)',
  fontFamily: 'Plus Jakarta Sans, sans-serif',
  '& .MuiDataGrid-columnHeaders': {
    background: 'linear-gradient(90deg, #f8fafc 0%, #e9e9ff 100%)',
    fontWeight: 700,
    fontSize: '1.10rem',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    letterSpacing: 0.1
  },
  '& .MuiDataGrid-row': {
    fontWeight: 500,
    fontSize: '1.00rem',
    transition: 'background 0.15s',
    '&:hover': {
      background: alpha(theme.palette.secondary.light, 0.09)
    }
  },
  '& .MuiDataGrid-footerContainer': {
    background: 'linear-gradient(90deg, #f8fafc 0%, #e9e9ff 100%)',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    fontWeight: 500,
    letterSpacing: 0.1
  },
  '& .MuiDataGrid-cell': {
    alignItems: 'center'
  }
}))

const columns = [
  {
    field: 'userFirstName',
    headerName: 'First Name',
    minWidth: 120,
    flex: 1,
    valueGetter: params => params.row.userId?.firstname || ''
  },
  {
    field: 'userSurname',
    headerName: 'Surname',
    minWidth: 120,
    flex: 1,
    valueGetter: params => params.row.userId?.surname || ''
  },
  {
    field: 'userEmail',
    headerName: 'Email',
    minWidth: 200,
    flex: 2,
    valueGetter: params => params.row.userId?.email || '',
    renderCell: params => (
      <Tooltip title={params.value}>
        <span
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {params.value}
        </span>
      </Tooltip>
    )
  },
  {
    field: 'hotelDetails',
    headerName: 'Room Details',
    minWidth: 300,
    flex: 2,
    renderCell: params => (
      <Stack direction='row' alignItems='center' spacing={2}>
        <Avatar
          src={params.value?.images?.[0]}
          alt={params.value?.name}
          sx={{ width: 48, height: 36, borderRadius: 2, mr: 1 }}
          variant='rounded'
        />
        <Box>
          <Typography variant='subtitle2' fontWeight={700}>
            {params.row?.hotelName || 'No Hotel Name'}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            {params.value?.name}
          </Typography>
        </Box>
      </Stack>
    )
  },

  {
    field: 'checkInDate',
    headerName: 'Check In',
    minWidth: 160,
    flex: 1,
    valueGetter: params =>
      params.value ? dayjs(params.value).format('DD MMM YYYY, ddd') : ''
  },
  {
    field: 'checkOutDate',
    headerName: 'Check Out',
    minWidth: 160,
    flex: 1,
    valueGetter: params =>
      params.value ? dayjs(params.value).format('DD MMM YYYY, ddd') : ''
  },
  {
    field: 'rooms',
    headerName: 'NO Rooms',
    minWidth: 110,
    flex: 1
  },
  {
    field: 'guests',
    headerName: 'Guests',
    minWidth: 90,
    flex: 1
  },
  {
    field: 'nights',
    headerName: 'Nights',
    minWidth: 90,
    flex: 1
  },
  {
    field: 'totalPrice',
    headerName: 'Total Price',
    minWidth: 120,
    flex: 1,
    valueFormatter: params =>
      params.value ? `₦${params.value.toLocaleString()}` : ''
  },
  {
    field: 'status',
    headerName: 'Status',
    minWidth: 200,
    flex: 1,
    renderCell: params => (
      <Chip
        label={params.value}
        color={statusColors[params.value] || 'default'}
        sx={{ fontWeight: 600, fontSize: 13 }}
        variant={params.value === 'Pending' ? 'outlined' : 'filled'}
      />
    )
  },
  {
    field: 'createdAt',
    headerName: 'Booked On',
    minWidth: 160,
    flex: 1.2,
    valueGetter: params =>
      params.value ? dayjs(params.value).format('DD MMM YYYY, HH:mm') : '',
    renderCell: params =>
      params.value ? (
        <Tooltip title={dayjs(params.row.createdAt).fromNow()}>
          <span>{params.value}</span>
        </Tooltip>
      ) : (
        ''
      )
  }
]

export default function BookingHistoryComponent () {
  const [search, setSearch] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const theme = useTheme()

  useEffect(() => {
    setLoading(true)
    axios
<<<<<<< HEAD:src/Components/BookingHistoryComponent.jsx
      .get('https://bonserver-vic7.onrender.com/booking/bookings')
=======
      .get('https://bonserver-vic7.onrender.com/user/users')
>>>>>>> 0071953fb8ed44b9bfd7284bd42e3726ec7c1000:src/Components/BookingOrder.jsx
      .then(response => {
        const bookings = Array.isArray(response.data) ? response.data : []
        console.log('Booking history fetched successfully')
        setRows(
          bookings.map((booking, idx) => ({
            ...booking,
            id: booking._id || idx
          }))
        )
      })
      .catch(() => {
        setRows([])
        console.log('Error fetching booking history')
      })
      .finally(() => setLoading(false))
  }, [])

  const filteredRows = rows.filter(row =>
    [
      row.hotelDetails?.name,
      row.hotelName,
      row.status,
      row.totalPrice,
      row.nights,
      row.rooms,
      row.guests,
      row.checkInDate,
      row.checkOutDate
    ]
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  return (
    <Box sx={{ p: { xs: 1, sm: 3 }, bgcolor: '#fff', minHeight: '100vh' }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems={{ xs: 'stretch', sm: 'center' }}
        justifyContent='space-between'
        sx={{ mb: 3 }}
      >
        <Typography
          variant='h4'
          fontWeight={700}
          fontFamily='Plus Jakarta Sans, sans-serif'
          color={theme.palette.text.secondary}
          sx={{
            letterSpacing: '.5px',
            background: '#000',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Booking History
        </Typography>
        <Stack direction='row' spacing={1}>
          <TextField
            size='small'
            placeholder='Search bookings...'
            value={search}
            onChange={e => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon color='action' />
                </InputAdornment>
              ),
              sx: { bgcolor: '#fff', borderRadius: 2, minWidth: 240 }
            }}
            autoComplete='off'
          />
          <Button
            variant='outlined'
            sx={{
              textTransform: 'none',
              bgcolor: '#fff',
              borderRadius: 2,
              px: 1.5,
              minWidth: 40,
              boxShadow: 'none'
            }}
            color='inherit'
            startIcon={<FilterAltRoundedIcon />}
          >
            Filters
          </Button>
        </Stack>
      </Stack>
      <Box
        sx={{
          bgcolor: '#fff',
          borderRadius: 4,
          p: { xs: 1, sm: 2 },
          boxShadow: '0 6px 32px 0 rgba(30, 41, 59, 0.08)'
        }}
      >
        <FuturisticDataGrid
          autoHeight
          rows={filteredRows}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          rowsPerPageOptions={[5, 10, 20, 50]}
          loading={loading}
          components={{
            Toolbar: GridToolbar,
            LoadingOverlay: () => (
              <Stack
                alignItems='center'
                justifyContent='center'
                sx={{ width: '100%', py: 4 }}
              >
                <CircularProgress color='secondary' thickness={4} />
              </Stack>
            )
          }}
          sx={{
            '& .MuiDataGrid-toolbarContainer': {
              justifyContent: 'flex-end',
              background: '#f7fafd',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16
            }
          }}
          disableSelectionOnClick
        />
      </Box>
    </Box>
  )
}
