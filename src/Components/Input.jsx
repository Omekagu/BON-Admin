import React from 'react';

const Input = ({ placeholder }) => {
  return (
    <div>
      <input className="input" type="text" placeholder={placeholder} />
    </div>
  );
};

export default Input;
