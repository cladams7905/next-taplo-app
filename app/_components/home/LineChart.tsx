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
  ChartOptions
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Define the Props (if you want to make the component reusable)
interface LineChartProps {
  labels: string[];
  clicks: number[];
  impressions: number[];
}

const LineChart: React.FC<LineChartProps> = ({
  labels,
  clicks,
  impressions
}) => {
  // Chart data configuration
  const data = {
    labels,
    datasets: [
      {
        label: "Clicks",
        data: clicks,
        borderColor: "rgb(122, 129, 235, 0.5)",
        backgroundColor: "rgb(122, 129, 235, 0.2)",
        tension: 0.4
      },
      {
        label: "Impressions",
        data: impressions,
        borderColor: "rgb(122, 129, 235)",
        backgroundColor: "rgb(122, 129, 235, 0.2)",
        tension: 0.4
      }
    ]
  };

  // Chart options configuration
  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="flex flex-col max-w-[450px] items-center w-full justify-center animate-twSlideInBottom">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
