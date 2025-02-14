import React from 'react';

const Input = ({ type = "text", value, onChange, placeholder }) => {
  return (
    <div>
      <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="input" />
    </div>
  );
};

export default Input;
