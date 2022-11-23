import { PeopleAlt } from '@mui/icons-material';
import React from 'react';

const Box = ({ head, number }) => {
  return (
    <div className="box">
      <p className="box__head">{head}</p>
      <div className="box__content">
        <PeopleAlt /> <h1 className="box__number">{number}</h1>
      </div>
    </div>
  );
};

export default Box;
