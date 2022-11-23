import React from 'react';

const ChartCount = ({ color }) => {
  return (
    <div className="chartCount">
      <div className="chartcount__content cancelled">
        <span className={color}>1</span> cancelled
      </div>
      <div>
        <h2>3000</h2>
      </div>
    </div>
  );
};

export default ChartCount;
