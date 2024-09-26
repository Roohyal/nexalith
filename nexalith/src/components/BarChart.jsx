import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
  Legend,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";


ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Title, Legend, annotationPlugin);


const insideLabelPlugin = {
  id: "insideLabelPlugin",
  afterDatasetsDraw: (chart) => {
    const { ctx, data: { datasets } } = chart;

    datasets.forEach((dataset, i) => {
      const meta = chart.getDatasetMeta(i);
      meta.data.forEach((bar, index) => {
        const value = dataset.data[index];
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.font = "bold 14px Arial";
        ctx.fillText(value, bar.x, bar.y + (bar.height / 2) + 12);
      });
    });
  }
};

const BarChartWithArrows = () => {
  const data = {
    labels: ["Consolidated", "Stable", "Local", "Industry", "Laggards"],
    datasets: [{
      label: "Score",
      data: [6.6, 6.3, 5.7, 5.0, 5.3],
      backgroundColor: "#6B21A8",
      borderRadius: 8, 
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        ticks: {
          stepSize: 1,
          callback: (value) => value.toFixed(1), // Ensure decimal format
        }
      }
    },
    plugins: {
      legend: { display: false },
      annotation: {
        annotations: {
          arrowLabels: {
            type: 'line',
            xMin: 4.5, // End of the last bar
            xMax: 4.5,
            borderColor: 'black',
            borderWidth: 2,
            label: {
              enabled: true,
              content: "End",
              position: "end",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "white",
              font: { size: 12 }
            }
          }
        }
      }
    }
  };

  return (
    <div className="relative bg-purple-300 p-8 w-full lg:w-[900px] lg:h-[600px] mx-auto flex flex-col justify-between">
     
      <div className="flex justify-between mb-4 space-x-4">
        {["Fragmented", "Volatile", "Global", "New players", "Early adapters"].map((label, index) => (
          <span key={index} className="text-center text-sm font-bold text-gray-900 w-1/5">
            {label}
          </span>
        ))}
      </div>

      <div className="relative">
       
        <div className="relative z-10 w-full h-[400px] lg:h-[500px] p-4">
          <Bar data={data} options={options} plugins={[insideLabelPlugin]} />
        </div>
      
        <div className="absolute top-0 right-[-100px] flex flex-col items-center justify-between h-[400px] lg:h-[500px] space-y-4">
          <span className="text-sm font-bold">High risk </span>
          <span className="text-sm font-bold">Medium risk</span>
          <span className="text-sm font-bold">Low risk</span>
        </div>
      </div>

    
      <div className="flex justify-between mt-6 space-x-4">
        {["Market maturity", "Market situation", "Competitors", "Competition", "Customers"].map((label, index) => (
          <span key={index} className="text-center text-sm font-bold text-gray-900 w-1/8">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BarChartWithArrows;
