import React from 'react';

const Button = ({ text }) => {
  return (
    <div className="button">
      <p className="button__text">{text}</p>
    </div>
  );
};

export default Button;
