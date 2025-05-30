import React from 'react'

const customerData = [
  {
    id: 1,
    name: 'Aris numan',
    role: 'Room cleaner',
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
    taskId: '2154',
    room: '#4323',
    taskDesc: 'Clean the room',
    completed: true
  },
  {
    id: 2,
    name: 'Aris numan',
    role: 'Room cleaner',
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    taskId: '2136',
    room: '#4323',
    taskDesc: 'Clean the room',
    completed: false
  },
  {
    id: 3,
    name: 'Aris numan',
    role: 'Room cleaner',
    avatar: 'https://randomuser.me/api/portraits/men/13.jpg',
    taskId: '21425',
    room: '#4323',
    taskDesc: 'Clean the room',
    completed: true
  },
  {
    id: 4,
    name: 'Aris numan',
    role: 'Room cleaner',
    avatar: 'https://randomuser.me/api/portraits/men/14.jpg',
    taskId: '21547',
    room: '#4323',
    taskDesc: 'Clean the room',
    completed: false
  }
]

const CustomerSchedule = () => {
  return (
    <div className='customer-schedule'>
      <div className='customer-schedule__header-row'>
        <h3>customer schedule</h3>
        <a className='customer-schedule__seeall' href='#see-all'>
          See all
        </a>
      </div>
      <div className='customer-schedule__main-row'>
        <div className='customer-schedule__summary'>
          <div className='customer-schedule__count'>254</div>
          <div className='customer-schedule__label'>customer working now</div>
          <form className='customer-schedule__newtask'>
            <label className='customer-schedule__newtask-label'>
              Create new task
              <select>
                <option>Cleaner</option>
                <option>Chef</option>
                <option>Reception</option>
              </select>
            </label>
            <div className='customer-schedule__newtask-input'>
              <input type='text' placeholder='Enter name' />
              <button type='submit'>
                <svg width='18' height='18' viewBox='0 0 20 20' fill='none'>
                  <path
                    d='M9 17a8 8 0 100-16 8 8 0 000 16zm5.293-6.707a1 1 0 10-1.414 1.414L15.586 17l-2.707 2.707a1 1 0 001.414 1.414l3.414-3.414a1 1 0 000-1.414l-3.414-3.414z'
                    fill='#BDBDBD'
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
        <div className='customer-schedule__list'>
          {customerData.map(customer => (
            <div className='customer-schedule__card' key={customer.id}>
              <div className='customer-schedule__card-header'>
                <img
                  src={customer.avatar}
                  alt={customer.name}
                  className='customer-schedule__avatar'
                />
                <div>
                  <div className='customer-schedule__name'>{customer.name}</div>
                  <div className='customer-schedule__role'>{customer.role}</div>
                </div>
              </div>
              <div className='customer-schedule__card-task'>
                <div className='customer-schedule__taskid'>
                  New task : <span>{customer.taskId}</span>
                </div>
                <div className='customer-schedule__room'>
                  Room no: <span>{customer.room}</span>
                </div>
                <div className='customer-schedule__desc'>
                  {customer.taskDesc}
                </div>
              </div>
              <div
                className={
                  customer.completed
                    ? 'customer-schedule__status customer-schedule__status--completed'
                    : 'customer-schedule__status customer-schedule__status--not'
                }
              >
                <span className='customer-schedule__status-dot' />
                {customer.completed ? 'Completed' : 'Not Complete'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CustomerSchedule
