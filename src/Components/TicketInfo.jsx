import { Avatar } from '@mui/material';
import React from 'react';

const TicketInfo = ({ name, number, time }) => {
  return (
    <div className="ticket">
      <div className="ticket__left">
        <Avatar />
        <div className="ticket__content">
          <h3 className="ticket__name">{name}</h3>
          <p className="ticket__number">{number}</p>
        </div>
      </div>
      <p className="ticket__time">{time}</p>
    </div>
  );
};

export default TicketInfo;
