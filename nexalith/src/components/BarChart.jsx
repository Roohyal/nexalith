import React from "react";
import { Bar } from "react-chartjs-2"; // Importing Bar chart component from react-chartjs-2
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
  Legend,
} from "chart.js"; // Importing essential components from Chart.js for bar chart

import annotationPlugin from "chartjs-plugin-annotation"; // Importing annotation plugin for adding annotations to the chart

// Registering the components and plugins for the chart to work properly
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Title, Legend, annotationPlugin);

// Custom plugin to add inside labels to each bar in the chart
const insideLabelPlugin = {
  id: "insideLabelPlugin", // Plugin ID
  afterDatasetsDraw: (chart) => { // Function to draw the text after the dataset (bars) is rendered
    const { ctx, data: { datasets } } = chart; // Extracting canvas context and datasets

    datasets.forEach((dataset, i) => {
      const meta = chart.getDatasetMeta(i); // Getting metadata of each dataset
      meta.data.forEach((bar, index) => {
        const value = dataset.data[index]; // Getting the value of each bar
        ctx.fillStyle = "white"; // Text color
        ctx.textAlign = "center"; // Aligning the text in the center of each bar
        ctx.font = window.innerWidth < 768 ? "bold 10px Arial" : "bold 14px Arial"; // Responsive font size

        ctx.fillText(value, bar.x, bar.y - 10); // Numerical indicator on top of the bar
        // Write the label inside the bars on small screens
        if (window.innerWidth < 768) {
            ctx.fillText(labels[index], bar.x, bar.y - (bar.height / 2) - 5);
          }
      });
    });
  }
};

// Function to determine risk level colors based on values with variations of purple
const getRiskColor = (value) => {
    if (value >= 6) return "#6B21A8"; // Darker Purple (Low Risk)
    if (value >= 5 && value < 6) return "#A855F7"; // Medium Purple (Medium Risk)
    return "#E0B3FF"; // Light Purple (High Risk)
  };

// Component to render the bar chart with annotation arrows
const BarChartWithArrows = () => {
  // Chart data with labels and dataset
  const data = {
    labels: ["Consolidated", "Stable", "Local", "Industry", "Laggards"], // X-axis labels
    datasets: [{
      label: "Score", // Label for the dataset
      data: [6.6, 6.3, 5.7, 5.0, 5.3], // Values corresponding to each label
     // Function to determine risk level colors based on values
     backgroundColor: (context) => { // Dynamic background color based on score
        const value = context.dataset.data[context.dataIndex];
        return getRiskColor(value);
      },// Bar color
      borderRadius: 8, // Rounded corners for the bars
    }]
  };

  // Chart options for customization
  const options = {
    responsive: true, // Chart adjusts based on container size
    maintainAspectRatio: false, // Disable default aspect ratio to allow custom sizing
    scales: {
      y: {
        beginAtZero: true, // Start Y-axis from 0
        max: 10, // Set maximum value for Y-axis
        ticks: {
          stepSize: 1, // Interval between Y-axis values
          callback: (value) => value.toFixed(1), // Ensures values are shown with 1 decimal point
        }
      }
    },
    plugins: {
        legend: { display: false }, // Disable legend
        annotation: {
          annotations: {
            
            line2: {
              type: 'line',
              xMin: 4.5, // Adjust this value to move the arrow horizontally
              xMax: 4.5, // Keep the same as xMin for a vertical line
              yMin: 1,   // Start at the bottom of the chart
              yMax: 10,
              borderColor: 'black',
              borderWidth: 2,
              arrowHeads: {
                end: {
                  enabled: true,    // Enable the arrowhead at the end (top)
                  fill: true,
                  length: 15,       // Length of the arrowhead
                  width: 10,        // Width of the arrowhead
                }
              },
              label: {
                enabled: true,
                content: "End",
                position: "end",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                color: "white",
                font: { size: 12 }
              }
            },
          }
        }
      }
    };

    return (
        // Main container for the chart and labels
        <div className="relative bg-purple-300 p-4 md:p-6 lg:p-8 w-full max-w-[95%] lg:max-w-[900px] mx-auto flex flex-col justify-between">
          
          {/* Row of labels above the chart */}
          <div className="hidden md:flex justify-between mb-4 space-x-2 md:space-x-4">
      {["Fragmented", "Volatile", "Global", "New players", "Early adapters"].map((label, index) => (
        <span key={index} className="text-center text-xs md:text-sm font-bold text-gray-900 w-1/5">
          {label} {/* Text labels above the chart */}
        </span>
      ))}
    </div>
      
          <div className="relative">
            
            {/* Bar chart */}
            <div className="relative z-10 w-full h-[250px] md:h-[400px] lg:h-[500px] p-2 md:p-4">
              <Bar data={data} options={options} plugins={[insideLabelPlugin]} />
            </div>
            
            {/* Risk level indicators on the side with arrows and write-up */}
            <div className="absolute top-0 right-[-80px] md:right-[-100px] lg:right-[-120px] flex flex-col items-center justify-between h-[250px] md:h-[400px] lg:h-[500px] space-y-2 md:space-y-4 hidden md:flex">
              <div className="flex flex-col items-center space-y-1 md:space-y-2">
                <span className="text-xs md:text-sm font-bold">High risk</span>
                <span className="text-xs text-gray-600">Strong need for innovation</span>
              </div>
              <div className="flex flex-col items-center space-y-1 md:space-y-2">
                <span className="text-xs md:text-sm font-bold">Medium risk</span>
                <span className="text-xs text-gray-600">Need for innovation</span>
              </div>
              <div className="flex flex-col items-center space-y-1 md:space-y-2">
                <span className="text-xs md:text-sm font-bold">Low risk</span>
                <span className="text-xs text-gray-600">Low need for innovation</span>
              </div>
            </div>
          </div>
      
          {/* Row of labels below the chart */}
          <div className="flex justify-between mt-4 md:mt-6 space-x-2 md:space-x-4 hidden md:flex">
            {["Market maturity", "Market situation", "Competitors", "Competition", "Customers"].map((label, index) => (
              <span key={index} className="text-center text-xs md:text-sm font-bold text-gray-900 w-1/8">
                {label} {/* Text labels below the chart */}
              </span>
            ))}
          </div>
        </div>
      );
      
      
};

export default BarChartWithArrows; // Export the component
