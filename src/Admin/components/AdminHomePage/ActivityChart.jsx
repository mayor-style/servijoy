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
import { Line } from "react-chartjs-2";

// Register chart.js components
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

const ActivityChart = ({ chartData }) => {
  const data = {
    labels: chartData.map((item) => item.month),
    datasets: [
      {
        label: "User Signups",
        data: chartData.map((item) => item.signups),
        borderColor: "#4A90E2",
        backgroundColor: "rgba(74, 144, 226, 0.2)",
        fill: true,
        tension: 0.3,
      },
      {
        label: "Service Requests",
        data: chartData.map((item) => item.requests),
        borderColor: "#50E3C2",
        backgroundColor: "rgba(80, 227, 194, 0.2)",
        fill: true,
        tension: 0.3,
      },
      {
        label: "Vendor Responses",
        data: chartData.map((item) => item.responses),
        borderColor: "#F5A623",
        backgroundColor: "rgba(245, 166, 35, 0.2)",
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
    <div className="h-64 bg-soft-white dark:bg-gray-800 rounded-lg shadow-lg p-4 transition">
      <Line data={data} options={options} />
    </div>
  );
};

export default ActivityChart;
