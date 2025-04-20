import React, { useState, useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Calendar, ChevronDown, Download, Eye, EyeOff, Filter, RefreshCw } from 'lucide-react';

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ActivityChart = ({ chartData }) => {
  // State management
  const [visibleDatasets, setVisibleDatasets] = useState({
    signups: true,
    requests: true,
    responses: true
  });
  const [timeRange, setTimeRange] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const chartRef = useRef(null);
  
  // Filter data based on time range
  const filteredData = () => {
    if (timeRange === 'all') return chartData;
    
    const now = new Date();
    let cutoffDate;
    
    switch(timeRange) {
      case '3m':
        cutoffDate = new Date(now.setMonth(now.getMonth() - 3));
        break;
      case '6m':
        cutoffDate = new Date(now.setMonth(now.getMonth() - 6));
        break;
      case '1y':
        cutoffDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      default:
        return chartData;
    }
    
    return chartData.filter(item => {
      const itemDate = new Date(item.month);
      return itemDate >= cutoffDate;
    });
  };
  
  // Prepare chart data
  const data = {
    labels: filteredData().map((item) => item.month),
    datasets: [
      {
        label: "User Signups",
        data: filteredData().map((item) => item.signups),
        borderColor: "#4361EE",
        backgroundColor: "rgba(67, 97, 238, 0.2)",
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointBackgroundColor: "#4361EE",
        pointRadius: 3,
        pointHoverRadius: 5,
        hidden: !visibleDatasets.signups,
      },
      {
        label: "Service Requests",
        data: filteredData().map((item) => item.requests),
        borderColor: "#3A0CA3",
        backgroundColor: "rgba(58, 12, 163, 0.2)",
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointBackgroundColor: "#3A0CA3",
        pointRadius: 3,
        pointHoverRadius: 5,
        hidden: !visibleDatasets.requests,
      },
      {
        label: "Vendor Responses",
        data: filteredData().map((item) => item.responses),
        borderColor: "#F72585",
        backgroundColor: "rgba(247, 37, 133, 0.2)",
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointBackgroundColor: "#F72585",
        pointRadius: 3,
        pointHoverRadius: 5,
        hidden: !visibleDatasets.responses,
      },
    ],
  };

  // Enhanced chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: 'easeOutQuart'
    },
    plugins: {
      legend: { 
        display: false, // We'll create custom legend
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.8)',
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
        padding: 12,
        cornerRadius: 6,
        displayColors: true,
        usePointStyle: true,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat().format(context.parsed.y);
            }
            return label;
          }
        }
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: { 
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
        ticks: { 
          color: "rgb(107, 114, 128)",
          font: { 
            size: 11 
          },
          maxRotation: 45,
          minRotation: 45
        } 
      },
      y: { 
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
        ticks: { 
          color: "rgb(107, 114, 128)",
          font: { 
            size: 11 
          },
          callback: function(value) {
            return new Intl.NumberFormat().format(value);
          }
        },
        beginAtZero: true
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true
    }
  };

  // Toggle dataset visibility
  const toggleDataset = (dataset) => {
    setVisibleDatasets(prev => ({
      ...prev,
      [dataset]: !prev[dataset]
    }));
  };

  // Download chart as image
  const downloadChart = () => {
    if (chartRef && chartRef.current) {
      const url = chartRef.current.toBase64Image();
      const link = document.createElement('a');
      link.href = url;
      link.download = 'activity-chart.png';
      link.click();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Activity Dashboard</h3>
          
          <div className="flex space-x-2">
            {/* Time range selector */}
            <div className="relative">
              <button 
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <Calendar className="w-4 h-4 mr-2" />
                {timeRange === 'all' ? 'All Time' : 
                 timeRange === '3m' ? 'Last 3 Months' : 
                 timeRange === '6m' ? 'Last 6 Months' : 'Last Year'}
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10 border border-gray-200 dark:border-gray-700">
                  <ul className="py-1">
                    <li 
                      className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => {setTimeRange('all'); setIsDropdownOpen(false);}}
                    >
                      All Time
                    </li>
                    <li 
                      className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => {setTimeRange('3m'); setIsDropdownOpen(false);}}
                    >
                      Last 3 Months
                    </li>
                    <li 
                      className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => {setTimeRange('6m'); setIsDropdownOpen(false);}}
                    >
                      Last 6 Months
                    </li>
                    <li 
                      className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => {setTimeRange('1y'); setIsDropdownOpen(false);}}
                    >
                      Last Year
                    </li>
                  </ul>
                </div>
              )}
            </div>
            
            {/* Download button */}
            <button 
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={downloadChart}
              title="Download chart"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Custom legend */}
      <div className="flex flex-wrap gap-2 p-4 border-b border-gray-200 dark:border-gray-700">
        <button 
          className={`flex items-center px-3 py-1.5 text-xs font-medium rounded-full ${visibleDatasets.signups ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'}`}
          onClick={() => toggleDataset('signups')}
        >
          <span className="w-3 h-3 mr-1.5 rounded-full bg-blue-500" style={{ backgroundColor: "#4361EE" }}></span>
          User Signups
          {visibleDatasets.signups ? <Eye className="w-3.5 h-3.5 ml-1.5" /> : <EyeOff className="w-3.5 h-3.5 ml-1.5" />}
        </button>
        
        <button 
          className={`flex items-center px-3 py-1.5 text-xs font-medium rounded-full ${visibleDatasets.requests ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200' : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'}`}
          onClick={() => toggleDataset('requests')}
        >
          <span className="w-3 h-3 mr-1.5 rounded-full" style={{ backgroundColor: "#3A0CA3" }}></span>
          Service Requests
          {visibleDatasets.requests ? <Eye className="w-3.5 h-3.5 ml-1.5" /> : <EyeOff className="w-3.5 h-3.5 ml-1.5" />}
        </button>
        
        <button 
          className={`flex items-center px-3 py-1.5 text-xs font-medium rounded-full ${visibleDatasets.responses ? 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200' : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'}`}
          onClick={() => toggleDataset('responses')}
        >
          <span className="w-3 h-3 mr-1.5 rounded-full" style={{ backgroundColor: "#F72585" }}></span>
          Vendor Responses
          {visibleDatasets.responses ? <Eye className="w-3.5 h-3.5 ml-1.5" /> : <EyeOff className="w-3.5 h-3.5 ml-1.5" />}
        </button>
      </div>
      
      {/* Chart container */}
      <div className="p-4">
        <div className="h-72 lg:h-80">
          <Line data={data} options={options} ref={chartRef} />
        </div>
      </div>
      
      {/* Summary metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800">
        {visibleDatasets.signups && (
          <div className="p-3 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Total User Signups</div>
            <div className="text-2xl font-bold text-gray-800 dark:text-white">
              {new Intl.NumberFormat().format(filteredData().reduce((sum, item) => sum + item.signups, 0))}
            </div>
            <div className="text-xs text-green-500 mt-1 flex items-center">
              <RefreshCw className="w-3 h-3 mr-1" /> Updated just now
            </div>
          </div>
        )}
        
        {visibleDatasets.requests && (
          <div className="p-3 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Total Service Requests</div>
            <div className="text-2xl font-bold text-gray-800 dark:text-white">
              {new Intl.NumberFormat().format(filteredData().reduce((sum, item) => sum + item.requests, 0))}
            </div>
            <div className="text-xs text-green-500 mt-1 flex items-center">
              <RefreshCw className="w-3 h-3 mr-1" /> Updated just now
            </div>
          </div>
        )}
        
        {visibleDatasets.responses && (
          <div className="p-3 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Total Vendor Responses</div>
            <div className="text-2xl font-bold text-gray-800 dark:text-white">
              {new Intl.NumberFormat().format(filteredData().reduce((sum, item) => sum + item.responses, 0))}
            </div>
            <div className="text-xs text-green-500 mt-1 flex items-center">
              <RefreshCw className="w-3 h-3 mr-1" /> Updated just now
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityChart;