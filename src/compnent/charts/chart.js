import React from "react";
import "./chart.css";
import  { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const data = [
    {
      name: 'january',
      uv: 1000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'february',
      uv: 1900,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'march',
      uv: 1200,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'april',
      uv: 2000,
      pv: 308,
      amt: 1000,
    },
    {
      name: 'may',
      uv: 1090,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'june',
      uv: 1090,
      pv: 3800,
      amt: 2500,
    },
  ];
  

const Chart=({aspect}) =>{
    return(
        <div className="main-chart ">
            <ResponsiveContainer width="100%" height="100%" aspect={aspect}>
            <AreaChart width={730} height={250} data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            {/* <YAxis />  */}
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
            </AreaChart>
      </ResponsiveContainer>

        </div>
    )
}
export default Chart;