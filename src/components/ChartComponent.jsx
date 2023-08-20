"use client";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const data = {
  labels: [
    "Anxiety",
    "Depression",
    "ADHD",
    "Bipolar",
    "Autsim",
    "Schizophrenia",
  ],
  datasets: [
    {
      label: "Mental Health Analysis",
      backgroundColor: "rgba(0,50,150,0.4)",
      borderColor: "rgba(0,10,150,0.5)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(0,10,150,1)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [65, 59, 80, 81, 55, 40],
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const BarChart = () => {
  return <Bar data={data} options={options} />;
};

export default BarChart;
