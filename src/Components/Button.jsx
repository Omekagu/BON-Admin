import React from 'react';

const Button = ({ text, onSubmit }) => {
  return (
    <div className="button" onSubmit={onSubmit}>
      <p className="button__text">{text}</p>
    </div>
  );
};

export default Button;
