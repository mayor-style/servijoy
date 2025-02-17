import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const TrendChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: "Revenue Trend",
        data: data.map((item) => item.revenue),
        borderColor: "#38A169", // custom green (without numeric scale)
        backgroundColor: "rgba(56, 161, 105, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: "inherit" } },
    },
    scales: {
      x: { ticks: { color: "inherit" } },
      y: { ticks: { color: "inherit" } },
    },
  };

  return (
    <div className="h-64 bg-soft-white dark:bg-gray-800 rounded-lg shadow-xl p-4 transition">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default TrendChart;
