import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { SentimentSummary } from '../types';

interface SentimentChartProps {
  data: SentimentSummary;
}

const COLORS = ['#4CAF50', '#f44336', '#9e9e9e'];

export const SentimentChart: React.FC<SentimentChartProps> = ({ data }) => {
  const chartData = [
    { name: 'Positive', value: data.positive },
    { name: 'Negative', value: data.negative },
    { name: 'Neutral', value: data.neutral },
  ];

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};