import * as React from 'react'
import {
  Box,
  Button,
  Stack,
  TextField,
  MenuItem,
  Typography,
  Chip,
  InputAdornment
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'
import AddIcon from '@mui/icons-material/Add'
import PrintIcon from '@mui/icons-material/Print'
import FileDownloadIcon from '@mui/icons-material/FileDownload'

const statusColors = {
  Cancelled: { color: 'error', label: 'Cancelled' },
  Booked: { color: 'info', label: 'Booked' },
  'In Cart': { color: 'warning', label: 'In Cart' },
  Closed: { color: 'default', label: 'Closed' },
  Dropped: { color: 'default', label: 'Dropped' },
  Test: { color: 'secondary', label: 'Test' },
  Request: { color: 'warning', label: 'Request' }
}
const deliveryStatusColors = {
  Cancelled: { color: 'error', label: 'Cancelled' },
  'Ready to pickup': { color: 'success', label: 'Ready to pickup' },
  Delayed: { color: 'warning', label: 'Delayed' },
  'Picked up': { color: 'success', label: 'Picked up' },
  'In transport': { color: 'info', label: 'In transport' },
  'In checking': { color: 'secondary', label: 'In checking' },
  Returned: { color: 'secondary', label: 'Returned' }
}

const orderRows = [
  {
    id: 1,
    ref: 'QH29',
    created: '15 Jul 2020 16:00',
    customer: 'Peter Kristiansen',
    product: 'Orbea Orca M30',
    start: '08 Aug 2020 14:00',
    end: '12 Aug 2020 09:00',
    distribution: 'Grubbgata 1 Oslo',
    status: 'Cancelled',
    deliveryStatus: 'Cancelled',
    price: '800.00 NOK',
    rowBg: ''
  },
  {
    id: 2,
    ref: 'V5B8',
    created: '15 Jul 2020 12:00',
    customer: 'Ola Nordmann',
    product: 'Pinarello Gan Disk',
    start: '07 Aug 2020 12:00',
    end: '14 Aug 2020 12:00',
    distribution: 'Avdeling 16 Sydbygde',
    status: 'Booked',
    deliveryStatus: 'Ready to pickup',
    price: '1 600.00 NOK',
    rowBg: ''
  },
  {
    id: 3,
    ref: 'LH44',
    created: '14 Jul 2020 20:16',
    customer: 'Viggo Aukland',
    product: 'S-Works Tarmac SL7',
    start: '05 Aug 2020 10:00',
    end: '08 Aug 2020 12:00',
    distribution: 'Grubbgata 1 Oslo',
    status: 'Booked',
    deliveryStatus: 'Delayed',
    price: '645.00 NOK',
    rowBg: 'highlight'
  },
  {
    id: 4,
    ref: 'TS49',
    created: '13 Jul 2020 07:24',
    customer: 'Merethe Meiling',
    product: 'Elite Direto XR, Schwalbe Ins...',
    start: '06 Aug 2020 09:00',
    end: '-',
    distribution: 'Avdeling 16 Sydbygde',
    status: 'In Cart',
    deliveryStatus: '',
    price: '199.99 NOK',
    rowBg: ''
  },
  {
    id: 5,
    ref: 'QEBO',
    created: '10 Jul 2020 20:00',
    customer: 'Edvin Jonassen',
    product: 'FELT SPORT-E 50',
    start: '05 Aug 2020 07:00',
    end: '-',
    distribution: 'Grubbgata 1 Oslo',
    status: 'Closed',
    deliveryStatus: 'Picked up',
    price: '399.00 NOK',
    rowBg: ''
  },
  {
    id: 6,
    ref: 'ZM94',
    created: '08 Jul 2020 16:12',
    customer: 'Admin',
    product: 'BH Atom 29',
    start: '01 Aug 2020 07:00',
    end: '-',
    distribution: 'Grubbgata 1 Oslo',
    status: 'Dropped',
    deliveryStatus: 'Cancelled',
    price: '485.00 NOK',
    rowBg: ''
  },
  {
    id: 7,
    ref: 'MV33',
    created: '08 Jul 2020 11:01',
    customer: 'Thorbjorn Bernsen',
    product: 'HJC Atara, Abus Hyban+',
    start: '31 Jul 2020 10:00',
    end: '-',
    distribution: 'Grubbgata 1 Oslo',
    status: 'Booked',
    deliveryStatus: 'Delayed',
    price: '485.00 NOK',
    rowBg: 'highlight'
  },
  {
    id: 8,
    ref: 'AA23',
    created: '08 Jul 2020 09:43',
    customer: 'Admin',
    product: 'Shimano 105 ST-R7000',
    start: '29 Jul 2020 06:15',
    end: '-',
    distribution: 'Ekebersgveien 65',
    status: 'Test',
    deliveryStatus: 'Returned',
    price: '399.00 NOK',
    rowBg: ''
  },
  {
    id: 9,
    ref: 'GR88',
    created: '07 Jul 2020 13:54',
    customer: 'Per Thue',
    product: 'EYEN Kort 2-Pack',
    start: '26 Jul 2020 12:00',
    end: '-',
    distribution: 'Avdeling 16 Sydbygde',
    status: 'Request',
    deliveryStatus: 'In transport',
    price: '512.00 NOK',
    rowBg: ''
  },
  {
    id: 10,
    ref: 'NL06',
    created: '07 Jul 2020 15:54',
    customer: 'Hallgrim Haukland',
    product: 'S-Works Shiv TT Disc',
    start: '24 Jul 2020 12:00',
    end: '-',
    distribution: 'Grubbgata 1 Oslo',
    status: 'Booked',
    deliveryStatus: 'In checking',
    price: '360.00 NOK',
    rowBg: ''
  }
]

const columns = [
  { field: 'ref', headerName: 'REF.', width: 90 },
  { field: 'created', headerName: 'CREATED', width: 140 },
  { field: 'customer', headerName: 'CUSTOMER', width: 150 },
  {
    field: 'product',
    headerName: 'PRODUCTS',
    width: 190,
    renderCell: params => <span title={params.value}>{params.value}</span>
  },
  { field: 'start', headerName: 'START TIME', width: 140 },
  { field: 'end', headerName: 'END TIME', width: 120 },
  { field: 'distribution', headerName: 'DISTRIBUTION', width: 160 },
  {
    field: 'status',
    headerName: 'STATUS',
    width: 120,
    renderCell: params =>
      params.value ? (
        <Chip
          size='small'
          label={statusColors[params.value]?.label || params.value}
          color={statusColors[params.value]?.color || 'default'}
          variant={
            ['Cancelled', 'Closed', 'Dropped'].includes(params.value)
              ? 'outlined'
              : 'filled'
          }
          sx={{ fontWeight: 600, fontSize: 13 }}
        />
      ) : null
  },
  {
    field: 'deliveryStatus',
    headerName: 'DELIVERY STATUS',
    width: 150,
    renderCell: params =>
      params.value ? (
        <Chip
          size='small'
          label={deliveryStatusColors[params.value]?.label || params.value}
          color={deliveryStatusColors[params.value]?.color || 'default'}
          variant={params.value === 'Cancelled' ? 'outlined' : 'filled'}
          sx={{ fontWeight: 600, fontSize: 13 }}
        />
      ) : null
  },
  {
    field: 'price',
    headerName: 'PRICE',
    width: 120,
    align: 'right',
    headerAlign: 'right'
  }
]

export default function BookingOrder () {
  const [search, setSearch] = React.useState('')
  const [pageSize, setPageSize] = React.useState(10)

  const filteredRows = orderRows.filter(row =>
    [row.ref, row.customer, row.product, row.status, row.deliveryStatus]
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  return (
    <Box sx={{ p: { xs: 1, sm: 2 }, bgcolor: '#eee', minHeight: '100vh' }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems={{ xs: 'stretch', sm: 'center' }}
        justifyContent='space-between'
        sx={{ mb: 2 }}
      >
        <Typography variant='h5' fontWeight={300} fontSize={15}>
          Bookings
        </Typography>
        <Stack direction='row' spacing={1}>
          <TextField
            size='small'
            placeholder='Search by any order parameter...'
            value={search}
            onChange={e => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon color='action' />
                </InputAdornment>
              ),
              sx: { bgcolor: '#eee', borderRadius: 1, minWidth: 220 }
            }}
          />
          <TextField
            size='small'
            select
            defaultValue=''
            sx={{ minWidth: 130, bgcolor: '#eee', borderRadius: 1 }}
          >
            <MenuItem value=''>Date range</MenuItem>
            <MenuItem value='today'>Today</MenuItem>
            <MenuItem value='week'>This week</MenuItem>
          </TextField>
          <TextField
            size='small'
            select
            defaultValue=''
            sx={{ minWidth: 110, bgcolor: '#eee', borderRadius: 1 }}
          >
            <MenuItem value=''>Status</MenuItem>
            <MenuItem value='booked'>Booked</MenuItem>
            <MenuItem value='cancelled'>Cancelled</MenuItem>
          </TextField>
          <TextField
            size='small'
            select
            defaultValue=''
            sx={{ minWidth: 140, bgcolor: '#eee', borderRadius: 1 }}
          >
            <MenuItem value=''>Department</MenuItem>
            <MenuItem value='oslo'>Oslo</MenuItem>
            <MenuItem value='sydbygde'>Sydbygde</MenuItem>
          </TextField>
          <Button
            variant='outlined'
            sx={{
              textTransform: 'none',
              bgcolor: '#eee',
              borderRadius: 1,
              px: 1.5,
              minWidth: 40
            }}
            startIcon={<FilterListIcon />}
          >
            More filters
          </Button>
          <Button
            variant='contained'
            // color='success'
            startIcon={<AddIcon />}
            sx={{
              borderRadius: 1,
              textTransform: 'none',
              fontWeight: 600,
              px: 2
            }}
          >
            Create Order
          </Button>
        </Stack>
      </Stack>
      <Box
        sx={{
          bgcolor: '#eee',
          borderRadius: 3,
          boxShadow: '0 2px 8px 0 rgba(0,0,0,0.03)',
          p: { xs: 1, sm: 2 }
        }}
      >
        <DataGrid
          autoHeight
          rows={filteredRows}
          columns={columns}
          getRowClassName={params =>
            params.row.rowBg === 'highlight' ? 'row-highlight' : ''
          }
          pageSize={pageSize}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          sx={{
            '& .row-highlight': {
              backgroundColor: 'rgba(255, 186, 73, 0.13)'
            },
            '& .MuiDataGrid-columnHeaders': {
              bgcolor: '#f4f6fa',
              fontWeight: 600,
              fontSize: '1rem'
            },
            '& .MuiDataGrid-cell': {
              fontSize: '0.97rem'
            },
            '& .MuiDataGrid-footerContainer': {
              bgcolor: '#f4f6fa'
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
            bgcolor: '#f4f6fa',
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
            mt: 2
          }}
        >
          <Stack direction='row' spacing={1}>
            <Button
              variant='text'
              size='small'
              startIcon={<PrintIcon />}
              sx={{ textTransform: 'none' }}
            >
              Print
            </Button>
            <Button
              variant='text'
              size='small'
              startIcon={<FileDownloadIcon />}
              sx={{ textTransform: 'none' }}
            >
              Export
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}
