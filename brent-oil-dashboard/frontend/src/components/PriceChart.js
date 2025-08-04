// frontend/src/components/PriceChart.js
import React from "react";
import { Line, Bar } from "react-chartjs-2"; // Import Line chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale,
  registerables, //Added registerables
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(...registerables);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale
);
const PriceChart = ({
  data,
  chartType = "line",
  dataKey = "prices",
  xKey = "dates",
  title = "",
}) => {
  // Process the data to handle missing values
  const chartData = {
    labels: data.map((item) => item[xKey]),
    datasets: [
      {
        label: dataKey,
        data: data.map((item) =>
          item[dataKey] === null ? undefined : item[dataKey]
        ),
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
        pointRadius: 3,
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: xKey,
        },
      },
      y: {
        title: {
          display: true,
          text: dataKey,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "400px",
      }}
    >
      {" "}
      {chartType === "line" ? (
        <Line data={chartData} options={chartOptions} />
      ) : (
        <Bar data={chartData} options={chartOptions} />
      )}{" "}
    </div>
  );
};

export default PriceChart;
