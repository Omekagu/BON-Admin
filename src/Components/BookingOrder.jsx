import * as React from 'react'
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
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded'
import PrintRoundedIcon from '@mui/icons-material/PrintRounded'
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { styled } from '@mui/material/styles'
import '@fontsource/plus-jakarta-sans/400.css'
import '@fontsource/plus-jakarta-sans/700.css'

// For pretty date display
dayjs.extend(relativeTime)

const roleColors = {
  user: 'info',
  admin: 'success',
  superadmin: 'secondary'
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
      background: alpha(theme.palette.primary.light, 0.09)
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
    field: 'profileImage',
    headerName: '',
    width: 60,
    renderCell: params =>
      params.value ? (
        <Tooltip title={params.row.firstname + ' ' + params.row.surname}>
          <Avatar
            src={params.value}
            alt={params.row.firstname}
            sx={{ width: 36, height: 36, boxShadow: 2 }}
          />
        </Tooltip>
      ) : (
        <Avatar sx={{ width: 36, height: 36, boxShadow: 2 }}>
          {(params.row.firstname?.[0] ?? '?').toUpperCase()}
        </Avatar>
      ),
    sortable: false,
    filterable: false,
    disableExport: true
  },
  {
    field: 'firstname',
    headerName: 'First Name',
    minWidth: 120,
    flex: 1,
    renderCell: params => (
      <Typography fontWeight={600}>{params.value}</Typography>
    )
  },
  {
    field: 'surname',
    headerName: 'Surname',
    minWidth: 120,
    flex: 1,
    renderCell: params => (
      <Typography fontWeight={600}>{params.value}</Typography>
    )
  },
  {
    field: 'email',
    headerName: 'Email',
    minWidth: 200,
    flex: 2,
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
    field: 'phoneNumber',
    headerName: 'Phone',
    minWidth: 140,
    flex: 1
  },
  {
    field: 'userCountry',
    headerName: 'Country',
    minWidth: 120,
    flex: 1
  },
  {
    field: 'role',
    headerName: 'Role',
    minWidth: 110,
    flex: 1,
    renderCell: params =>
      params.value ? (
        <Chip
          size='small'
          label={params.value.charAt(0).toUpperCase() + params.value.slice(1)}
          color={roleColors[params.value] || 'default'}
          sx={{ fontWeight: 600, fontSize: 13, letterSpacing: 0.2 }}
          variant={params.value === 'user' ? 'outlined' : 'filled'}
        />
      ) : null
  },
  {
    field: 'createdAt',
    headerName: 'Created',
    minWidth: 170,
    flex: 1,
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
  },
  {
    field: 'dob',
    headerName: 'DOB',
    minWidth: 110,
    flex: 1,
    valueGetter: params =>
      params.value ? dayjs(params.value).format('DD MMM YYYY') : ''
  },
  {
    field: 'gender',
    headerName: 'Gender',
    minWidth: 100,
    flex: 1
  },
  {
    field: 'address',
    headerName: 'Address',
    minWidth: 180,
    flex: 2,
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
    field: 'referralCode',
    headerName: 'Referral',
    minWidth: 90,
    flex: 1
  }
]

export default function BookingOrder () {
  const [search, setSearch] = React.useState('')
  const [pageSize, setPageSize] = React.useState(10)
  const [rows, setRows] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const theme = useTheme()

  React.useEffect(() => {
    setLoading(true)
    axios
      .get('http://localhost:5001/user/users')
      .then(response => {
        const users = Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data.users)
          ? response.data.users
          : [response.data]
        setRows(
          users.map((user, idx) => ({
            ...user,
            id: user._id || idx
          }))
        )
      })
      .catch(error => {
        enqueueSnackbar('Failed to fetch users.', { variant: 'error' })
        setRows([])
      })
      .finally(() => setLoading(false))
  }, [enqueueSnackbar])

  const filteredRows = rows.filter(row =>
    [
      row.referralCode,
      row.firstname,
      row.surname,
      row.email,
      row.phoneNumber,
      row.userCountry,
      row.deviceType,
      row.gender,
      row.role,
      row.address
    ]
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  return (
    <Box sx={{ p: { xs: 1, sm: 3 }, bgcolor: '#f2f4f8', minHeight: '100vh' }}>
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
          color={theme.palette.text.primary}
          sx={{
            letterSpacing: '.5px',
            background: 'linear-gradient(90deg, #5f78ff 0%, #7c53e7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          User Directory
        </Typography>
        <Stack direction='row' spacing={1}>
          <TextField
            size='small'
            placeholder='Search users...'
            value={search}
            onChange={e => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon color='action' />
                </InputAdornment>
              ),
              sx: { bgcolor: '#f7fafd', borderRadius: 2, minWidth: 240 }
            }}
            autoComplete='off'
          />
          <Button
            variant='outlined'
            sx={{
              textTransform: 'none',
              bgcolor: '#f7fafd',
              borderRadius: 2,
              px: 1.5,
              minWidth: 40,
              boxShadow: 'none'
            }}
            color='secondary'
            startIcon={<FilterAltRoundedIcon />}
          >
            Filters
          </Button>
          <Button
            variant='contained'
            color='primary'
            startIcon={<AddCircleRoundedIcon />}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 700,
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              px: 2.2,
              background: 'linear-gradient(90deg, #6558ff 0%, #7c53e7 100%)',
              boxShadow: '0 2px 10px 0 rgba(127, 86, 217, 0.14)'
            }}
          >
            Add User
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
                <CircularProgress color='primary' thickness={4} />
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
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems='center'
          justifyContent='space-between'
          spacing={1}
          sx={{
            px: 1,
            py: 1,
            bgcolor: '#f7fafd',
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
            mt: 2
          }}
        >
          <Stack direction='row' spacing={1}>
            <Button
              variant='text'
              size='small'
              startIcon={<PrintRoundedIcon />}
              sx={{ textTransform: 'none' }}
              onClick={() => window.print()}
            >
              Print
            </Button>
            <Button
              variant='text'
              size='small'
              startIcon={<FileDownloadRoundedIcon />}
              sx={{ textTransform: 'none' }}
              onClick={() =>
                enqueueSnackbar('Export feature coming soon.', {
                  variant: 'info'
                })
              }
            >
              Export
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}
