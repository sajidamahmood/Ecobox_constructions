import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale,LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'; 
import './ChartSection.css';

ChartJS.register(CategoryScale, BarElement,LinearScale, Title, Tooltip, Legend);

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Investment',
      data: [100, 200, 150, 300, 250, 400, 350, 300, 400, 450, 500, 600],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
    {
      label: 'Profit',
      data: [50, 100, 75, 150, 125, 200, 175, 150, 200, 225, 250, 300],
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1,
    },
    {
      label: 'Loss',
      data: [30, 40, 20, 50, 35, 60, 45, 50, 40, 70, 80, 100],
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Aperçu de la croissance totale',
    },
  },
};

const ChartSection = () => (
  <div className="chart-section">
    <h3>Croissance totale</h3>
    <Bar data={data} options={options} />
  </div>
);

export default ChartSection;
