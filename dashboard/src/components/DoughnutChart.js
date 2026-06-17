import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Register ChartJS instances
ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart({ data }) {
  // Safe fallback configuration to guarantee the app never crashes if data arrives empty/undefined
  const defaultData = {
    labels: ["No Holdings"],
    datasets: [
      {
        data: [100],
        backgroundColor: ["#f0f0f0"],
        hoverBackgroundColor: ["#e0e0e0"],
        borderWidth: 1,
      },
    ],
  };

  // Production configuration options to achieve the clean Zerodha look
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "right",
        labels: {
          boxWidth: 12,
          font: {
            family: "Inter, -apple-system, sans-serif",
            size: 12,
          },
          color: "#666",
          padding: 15,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#1f1f1f",
        titleFont: { family: "Inter, sans-serif", size: 13 },
        bodyFont: { family: "Inter, sans-serif", size: 12 },
        padding: 10,
        cornerRadius: 4,
        displayColors: false,
      },
    },
    cutout: "75%",
  };

  const chartKey =
    data && data.datasets && data.datasets[0]
      ? JSON.stringify(data.datasets[0].data)
      : "empty-state";

  return (
    <div
      className="chart-wrapper"
      style={{
        position: "relative",
        width: "100%",
        height: "260px",
        margin: "0 auto",
        padding: "10px 0",
      }}
    >
      <Doughnut
        key={chartKey}
        data={data && data.datasets ? data : defaultData}
        options={options}
      />
    </div>
  );
}

export default DoughnutChart;