import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register ChartJS core modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function VerticalGraph({ data }) {
  // Safe default fallback structure to prevent code crashes for new accounts with no trading records
  const defaultData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: "#e0e0e0",
      },
    ],
  };

  // Production chart styling configuration to mirror Zerodha Kite's design system
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hiding manual legends matches Kite's minimalist profile graph layout
      },
      title: {
        display: false, // Handled semantically via standard JSX typography for cleaner layout control
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#1f1f1f",
        titleFont: { family: 'Inter, -apple-system, sans-serif', size: 12, weight: '500' },
        bodyFont: { family: 'Inter, -apple-system, sans-serif', size: 12 },
        padding: 10,
        cornerRadius: 4,
        displayColors: false,
      }
    },
    scales: {
      x: {
        grid: {
          display: false, // Drops background vertical lines for a modern look
        },
        ticks: {
          color: "#999",
          font: { family: 'Inter, sans-serif', size: 11 }
        }
      },
      y: {
        grid: {
          color: "#fbfbfb", // Mutes horizontal line weights
        },
        ticks: {
          color: "#999",
          font: { family: 'Inter, sans-serif', size: 11 }
        }
      }
    }
  };

  // Dynamic token generation: Forces the canvas node to clear out internal memory stacks when a user profile swaps
  const graphKey = data && data.datasets && data.datasets[0]
    ? JSON.stringify(data.datasets[0].data)
    : "empty-graph";

  return (
    <div 
      className="graph-wrapper"
      style={{
        position: "relative",
        width: "100%",
        height: "300px", // Strict height boundary eliminates unexpected vertical layout shifting
        padding: "10px 0",
        boxSizing: "border-box"
      }}
    >
      <Bar 
        key={graphKey}
        options={options} 
        data={data && data.datasets ? data : defaultData} 
      />
    </div>
  );
}

export default VerticalGraph;