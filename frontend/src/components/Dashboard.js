import React from "react";
import { Bar } from "react-chartjs-2";

const Dashboard = () => {
  const data = {
    labels: ["Prompt 1", "Prompt 2", "Prompt 3"],
    datasets: [
      {
        label: "Response Time (s)",
        data: [0.5, 0.7, 0.6],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div>
      <h3>Analytics Dashboard</h3>
      <Bar data={data} />
    </div>
  );
};

export default Dashboard;
