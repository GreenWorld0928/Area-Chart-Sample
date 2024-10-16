import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceDot
} from "recharts";

// Example data
const data = [
  { name: "0", value: null },
  { name: "A", value: 30 },
  { name: "B", value: 20 },
  { name: "C", value: 27 },
  { name: "D", value: 18 },
  { name: "E", value: 23 },
  { name: "F", value: 32 },
  { name: "G", value: 25 },
  { name: "H", value: 31 },
  { name: "I", value: 19 },
  { name: "J", value: 28 },
  { name: "K", value: 34 },
  { name: "L", value: 22 },
  { name: "M", value: 15 },
  { name: "N", value: 29 },
  { name: "O", value: null }
];

const SplineAreaChart = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [chartUIValues, setChartUIValues] = useState(data);

  const handleMouseMove = (e) => {
    if (e && e.activeTooltipIndex !== undefined) {
      setHoveredIndex(e.activeTooltipIndex);
    }
  };

  useEffect(() => {
    setChartUIValues(
      data?.map((item, idx) => ({
        ...item,
        value1: idx <= hoveredIndex ? item.value : null,
        value2: idx >= hoveredIndex ? item.value : null
      }))
    );
  }, [hoveredIndex]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        onMouseMove={handleMouseMove}
        data={chartUIValues}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
        <XAxis dataKey="name" />
        <YAxis />

        <Area
          type="monotone"
          dataKey="value1"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
          isAnimationActive={false}
        />
        <Area
          type="monotone"
          dataKey="value2"
          stroke="#8884d8"
          fill="#ff84d8"
          fillOpacity={0.3}
          isAnimationActive={false}
        />

        {hoveredIndex !== null && (
          <>
            <ReferenceDot
              x={data[hoveredIndex].name}
              y={data[hoveredIndex].value}
              r={8}
              fill="#ff0000"
              stroke="#ddd"
            />
            <ReferenceLine
              x={data[hoveredIndex].name}
              stroke="#ff0000"
            />
          </>
        )}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SplineAreaChart;
