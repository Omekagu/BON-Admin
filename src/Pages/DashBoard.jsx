import React from 'react';
import Box from '../Components/Box';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import TicketInfo from '../Components/TicketInfo';
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

const DashBoard = () => {
  const dataTwo = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
  ];
  const COLORS = ['#ff0707', '#2dbc8b', '#0094c6'];

  const data = [
    {
      name: 'jan',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'feb',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'mar',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'apr',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'may',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'jun',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'jul',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: 'aug',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard__sidebar">
        {/* sidebar */}
        <Sidebar />
      </div>
      <div className="dashboard__mainboard">
        {/* Header section */}
        <Header />
        </div>
      </div>
  );
};

export default DashBoard;
