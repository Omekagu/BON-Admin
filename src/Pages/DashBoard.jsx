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
        {/* section one box */}
        <div className="dashboard__sectionOne">
          <Box head="total users" number="73,125" />
          <Box head="total drivers" number="3,125" />
          <Box head="active users" number="13,125" />
          <Box head="Active drivers" number="1,125" />
        </div>
        {/* section Two box */}
        <div className="dashboard__sectionTwo">
          <div className="left">
            <h4 className="left__head">sales statistical overview</h4>

            <div className="left__list">
              <div>
                <p className="left__title">
                  This is an overview of cash dispensed and creidited to account
                </p>
              </div>
              <div className="left__day">
                <p className="day">1d</p>
                <p className="day">7d</p>
                <p className="day">1m</p>
                <p className="day">1y</p>
                <p className="day">all</p>
              </div>
            </div>

            <div className="left__list">
              <div className="cash__info--right">
                <div className="cash__info">
                  <p className="inflow">cash inflow</p>
                  <h3>1,115,236</h3>
                </div>
                <div className="cash__info">
                  <p className="outflow">cash inflow</p>
                  <h3>362,128</h3>
                </div>
                <div className="cash__info">
                  <p className="total">cash inflow</p>
                  <h3> ₦75,3098</h3>
                </div>
              </div>

              <div className="cash__info--right">
                <p className="completed">
                  <span>111</span> completed
                </p>
                <p className="cancelled">
                  <span>111</span>cancelled
                </p>
              </div>
            </div>

            {/* chart */}

            <ResponsiveContainer width="100%" height="80%">
              <AreaChart
                width={500}
                height={400}
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stackId="1"
                  stroke="#ff0707"
                  fill="#ff0707"
                />
                <Area
                  type="monotone"
                  dataKey="pv"
                  stackId="1"
                  stroke="#2dbc8b"
                  fill="#2dbc8b"
                />
                <Area
                  type="monotone"
                  dataKey="amt"
                  stackId="1"
                  stroke="#0094c6"
                  fill="#0094c6"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="right">
            <div className="left__list">
              <div>
                <p className="left__title">
                  <p className="box__head">ride statistics</p>
                </p>
              </div>
              <div className="left__day">
                <select defaultValue="Last Hour">
                  <option>Last Hour</option>
                  <option>1 Hour</option>
                  <option>1 Day</option>
                  <option>1 Week</option>
                  <option>1 Month</option>
                  <option>1 Year</option>
                </select>
              </div>
            </div>

            <div className="chart__content">
              <div className="chart">
                {/* PIE CHART */}
                <PieChart width={400} height={300}>
                  <Pie
                    data={dataTwo}
                    cx={100}
                    cy={150}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    // paddingAngle={1}
                    dataKey="value"
                  >
                    {dataTwo.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Pie
                    data={dataTwo}
                    cx={420}
                    cy={200}
                    startAngle={180}
                    endAngle={0}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    // paddingAngle={5}
                    dataKey="value"
                  >
                    {dataTwo.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </div>
              <div className="">
                <div className="chartCount">
                  <div className="chartcount__content cancelled">
                    <span>1</span> cancelled
                  </div>
                  <div>
                    <h2>1200</h2>
                  </div>
                </div>
                <div className="chartCount">
                  <div className="chartcount__content completed">
                    <span>1</span> completed
                  </div>
                  <div>
                    <h2>35000</h2>
                  </div>
                </div>
                <div className="chartCount">
                  <div className="chartcount__content ongoing">
                    <span>1</span> ongoing
                  </div>
                  <div>
                    <h2>400</h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="chart__bottom">
              <p className="completed">
                <span>1</span> completed
              </p>
              <p className="cancelled">
                <span>1</span>cancelled
              </p>
              <p className="ongoing">
                <span>1</span> ongoing
              </p>
            </div>
          </div>
        </div>
        {/* section Three box */}
        <div className="dashboard__sectionThree">
          <div className="left">
            <h4 className="left__head">Market overview</h4>

            <div className="left__list">
              <div>
                <p className="left__title">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
              <div className="left__day">
                <select defaultValue="Last Hour">
                  <option>Last Hour</option>
                  <option>1 Hour</option>
                  <option>1 Day</option>
                  <option>1 Week</option>
                  <option>1 Month</option>
                  <option>1 Year</option>
                </select>
              </div>
            </div>

            <div>
              <h1 className="left__rate">
                ₦360,2531.000 <span>(+1.34%)</span>
              </h1>
            </div>

            {/*BarAreachart */}
            <ResponsiveContainer width="100%" height="80%">
              <BarChart
                width={500}
                height={400}
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" stackId="a" fill="#0094c6" />
                <Bar dataKey="uv" stackId="a" fill="#ff0707" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="right">
            <div className="right__head">
              <p>Tickets</p>
            </div>
            <div className="right__content">
              <TicketInfo
                name="rea douglas"
                number="16234"
                time="3 hours ago"
              />
              <TicketInfo
                name="gussie shelton"
                number="16234"
                time="4 hours ago"
              />
              <TicketInfo name="ora hill" number="16234" time="3 hours ago" />
              <TicketInfo name="brain dean" number="16234" time="3 hours ago" />
              <TicketInfo
                name="olive bridges"
                number="16234"
                time="3 hours ago"
              />
              <TicketInfo name="ora hill" number="16234" time="3 hours ago" />
              <TicketInfo name="brain dean" number="16234" time="3 hours ago" />
              <TicketInfo name="brain dean" number="16234" time="3 hours ago" />
              <TicketInfo name="brain dean" number="16234" time="3 hours ago" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
