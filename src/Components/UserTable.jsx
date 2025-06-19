<<<<<<< HEAD
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
  user: 'default',
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

export default function UserTable () {
  const [search, setSearch] = React.useState('')
  const [pageSize, setPageSize] = React.useState(10)
  const [rows, setRows] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const theme = useTheme()

  React.useEffect(() => {
    setLoading(true)
    axios
      .get('https://bonserver-vic7.onrender.com/user/users')
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
    <Box sx={{ p: { xs: 1, sm: 3 }, bgcolor: '#ffff', minHeight: '100vh' }}>
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
          <Button
            variant='contained'
            color='secondary'
            startIcon={<AddCircleRoundedIcon />}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 700,
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              px: 2.2,
              background: '#000',
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
              color='inherit'
              variant='text'
              size='small'
              startIcon={<PrintRoundedIcon />}
              sx={{ textTransform: 'none' }}
              onClick={() => window.print()}
            >
              Print
            </Button>
            <Button
              color='inherit'
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
=======
import React, { useState, useEffect } from 'react'
import { Edit, Visibility, Delete } from '@mui/icons-material'
import axios from 'axios' // For API calls
import { Modal, Box, Button, TextField, Pagination } from '@mui/material'
import * as XLSX from 'xlsx' // For Excel download

const UserTable = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1) // Updated to 1-based page number
  const [userToEdit, setUserToEdit] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('') // State to store search query

  // Fetch dummy users from JSONPlaceholder API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Use JSONPlaceholder for demo users (mocked data)
        const response = await axios.get(
          'https://bonserver-vic7.onrender.com/users'
        )
        setUsers(response.data)
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  // Paginate users
  const usersPerPage = 10
  const filteredUsers = users.filter(
    user =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  )

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }

  // View User Details
  const handleView = id => {
    alert(`Viewing details for user ID: ${users[0]._id}`)
  }

  // Edit User
  const handleEdit = user => {
    setUserToEdit(user)
    setModalOpen(true)
  }

  // Update User details
  const handleSave = () => {
    if (userToEdit) {
      axios
        .put(
          `https://bonserver-vic7.onrender.com/users/${userToEdit.id}`,
          userToEdit
        ) // Mock API PUT request
        .then(() => {
          setUsers(
            users.map(user => (user.id === userToEdit.id ? userToEdit : user))
          )
          setModalOpen(false)
          alert('User updated successfully!')
        })
        .catch(error => {
          console.error('Error updating user:', error)
          alert('Failed to update user.')
        })
    }
  }

  // Delete User
  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this user?')) return

    try {
      await axios.delete(
        `https://bonserver-vic7.onrender.com/users/${users._id}`
      ) // Mock API DELETE request
      setUsers(users.filter(user => user.id !== id)) // Remove user from state
      alert('User deleted successfully!')
    } catch (error) {
      console.error('Error deleting user:', error)
      alert('Failed to delete user.')
    }
  }

  // Handle search query change
  const handleSearchChange = e => {
    setSearchQuery(e.target.value)
  }

  // Excel download functionality
  const downloadExcel = () => {
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(filteredUsers)
    XLSX.utils.book_append_sheet(wb, ws, 'Users')
    XLSX.writeFile(wb, 'users_data.xlsx')
  }

  return (
    <div className='userTable'>
      <div className='userTable__header'>
        <h2>Users</h2>
        <input
          type='text'
          placeholder='Search users...'
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Button
          variant='contained'
          onClick={downloadExcel}
          style={{ marginLeft: '10px' }}
        >
          Download Excel
        </Button>
      </div>

      <div className='table-container'>
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>email</th>
                <th>Device</th>
                <th>Phone Number</th>
                <th>Date of Creation</th>
                <th>Country</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map(user => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.username.split(' ')[0]}</td>{' '}
                  {/* Assuming first name */}
                  <td>{user.email}</td>
                  <td>{user.deviceType}</td> {/* Assuming last name */}
                  <td>{user.phoneNumber}</td>
                  <td>
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </td>
                  <td>{user.userCountry}</td>
                  <td>
                    <span
                      className={`status ${
                        user.status === 'Active' ? 'active' : 'inactive'
                      }`}
                    >
                      {'Active'}
                    </span>
                  </td>
                  <td className='actions'>
                    <Visibility
                      className='view'
                      onClick={() => handleView(user.id)}
                    />
                    <Edit className='edit' onClick={() => handleEdit(user)} />
                    <Delete
                      className='delete'
                      onClick={() => handleDelete(user.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className='pagination'>
        <Pagination
          count={Math.ceil(filteredUsers.length / usersPerPage)} // Total number of pages
          page={currentPage} // Current page state
          onChange={handlePageChange} // Handler for page change
          variant='outlined' // Optional style choice
          shape='rounded' // Optional rounded edges for pagination buttons
          color='primary' // Optional color style for active page
        />
      </div>

      {/* Modal for Editing */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box className='modal-content'>
          <h3>Edit User</h3>
          {userToEdit && (
            <div>
              <TextField
                label='First Name'
                value={userToEdit.firstName}
                onChange={e =>
                  setUserToEdit({ ...userToEdit, firstName: e.target.value })
                }
                fullWidth
              />
              <TextField
                label='Last Name'
                value={userToEdit.lastName}
                onChange={e =>
                  setUserToEdit({ ...userToEdit, lastName: e.target.value })
                }
                fullWidth
              />
              <TextField
                label='Email'
                value={userToEdit.email}
                onChange={e =>
                  setUserToEdit({ ...userToEdit, email: e.target.value })
                }
                fullWidth
              />
              <TextField
                label='Phone Number'
                value={userToEdit.phoneNumber}
                onChange={e =>
                  setUserToEdit({ ...userToEdit, phoneNumber: e.target.value })
                }
                fullWidth
              />
              <Button variant='contained' onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  )
}

export default UserTable
>>>>>>> 0071953fb8ed44b9bfd7284bd42e3726ec7c1000
