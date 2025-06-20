import React, { useEffect, useState } from 'react'
import axios from 'axios'

const CustomerSchedule = ({ onSeeAll }) => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios
      .get('https://bonserver-production.up.railway.app//booking/bookings')
      .then(response => {
        // Sort newest to oldest and take first 5
        const sorted = Array.isArray(response.data)
          ? response.data
              .slice()
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          : []
        setBookings(sorted.slice(0, 3))
      })
      .catch(() => setBookings([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className='customer-schedule'>
      <div className='customer-schedule__header-row'>
        <h3>Booking schedule</h3>
        <a
          className='customer-schedule__seeall'
          href='/manage-user/booking'
          onClick={e => {
            if (onSeeAll) {
              e.preventDefault()
              onSeeAll()
            }
          }}
        >
          See all
        </a>
      </div>
      <div className='customer-schedule__main-row'>
        <div className='customer-schedule__summary'>
          <div className='customer-schedule__count'>{bookings.length}</div>
          <div className='customer-schedule__label'>recent bookings</div>
        </div>
        <div className='customer-schedule__list'>
          {loading ? (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              Loading...
            </div>
          ) : bookings.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              No bookings found
            </div>
          ) : (
            bookings.map(booking => (
              <div className='customer-schedule__card' key={booking._id}>
                <div className='customer-schedule__card-header'>
                  <img
                    src={
                      booking.userId?.profileImage ||
                      'https://ui-avatars.com/api/?name=' +
                        encodeURIComponent(
                          booking.userId?.firstname?.[0] || 'U'
                        )
                    }
                    alt={
                      booking.userId
                        ? booking.userId.firstname +
                          ' ' +
                          booking.userId.surname
                        : 'User'
                    }
                    className='customer-schedule__avatar'
                  />
                  <div>
                    <div className='customer-schedule__name'>
                      {booking.userId
                        ? `${booking.userId.firstname} ${booking.userId.surname}`
                        : 'Unknown'}
                    </div>
                    <div className='customer-schedule__role'>
                      {booking.userId?.email}
                    </div>
                  </div>
                </div>
                <div className='customer-schedule__card-task'>
                  <div className='customer-schedule__taskid'>
                    Room: <span>{booking.hotelDetails?.name || '-'}</span>
                  </div>
                  <div className='customer-schedule__room'>
                    Hotel: <span>{booking.hotelName || '-'}</span>
                  </div>
                  <div className='customer-schedule__desc'>
                    Check-in{' '}
                    {new Date(booking.checkInDate).toLocaleDateString()} |{' '}
                    Nights: {booking.nights} | Guests: {booking.guests}
                  </div>
                </div>
                <div
                  className={
                    booking.status === 'Completed' ||
                    booking.status === 'PayOn-Arrival'
                      ? 'customer-schedule__status customer-schedule__status--completed'
                      : 'customer-schedule__status customer-schedule__status--not'
                  }
                >
                  <span className='customer-schedule__status-dot' />
                  {booking.status}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default CustomerSchedule
