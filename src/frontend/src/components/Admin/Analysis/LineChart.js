import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
// import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Store chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

// export const data = {
//   labels: ["January", "February", "March", "April", "May", "June", "July"],
//   datasets: [
//     {
//       label: "Dataset 1",
//       data: [65, 59, 80, 81, 56, 55, 40],
//       borderColor: "rgb(255, 99, 132)",
//       backgroundColor: "rgba(255, 99, 132, 0.5)",
//     },
//     {
//       label: "Dataset 2",
//       data: [28, 48, 40, 19, 86, 27, 90],
//       borderColor: "rgb(53, 162, 235)",
//       backgroundColor: "rgba(53, 162, 235, 0.5)",
//     },
//     {
//       label: "Dataset 3",
//       data: [200, 48, 40, 19, 86, 27, 90],
//       borderColor: "rgb(53, 162, 235)",
//       backgroundColor: "rgba(20, 162, 235, 0.5)",
//     },
//   ],
// };

const LineChart = (props) => {
  const { data } = props;

  return <Line options={options} data={data} />;
};

export default LineChart;
