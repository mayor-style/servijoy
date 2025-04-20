import React, { useState, useEffect } from "react";
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
  Filler,
} from "chart.js";
import { Calendar, Download, RefreshCw } from "lucide-react";

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

const TrendChart = ({ 
  data = [], 
  title = "Revenue & User Growth",
  showDateRangePicker = true,
  showExport = true,
  height = "h-80",
  className = "" 
}) => {
  const [timeRange, setTimeRange] = useState("monthly");
  const [isLoading, setIsLoading] = useState(false);
  const [comparisonStats, setComparisonStats] = useState({
    currentPeriod: "$136,000",
    previousPeriod: "$125,000",
    yearToDate: "$1.25M",
    previousYear: "$980K"
  });
  
  // If no data is provided, use sample data
  const sampleData = {
    monthly: [
      { label: "Jan", revenue: 62500, users: 1500, conversions: 320 },
      { label: "Feb", revenue: 70000, users: 1800, conversions: 380 },
      { label: "Mar", revenue: 55000, users: 1600, conversions: 290 },
      { label: "Apr", revenue: 85000, users: 2200, conversions: 450 },
      { label: "May", revenue: 78000, users: 2000, conversions: 410 },
      { label: "Jun", revenue: 92000, users: 2400, conversions: 520 },
      { label: "Jul", revenue: 105000, users: 2800, conversions: 580 },
      { label: "Aug", revenue: 115000, users: 3000, conversions: 620 },
      { label: "Sep", revenue: 125000, users: 3200, conversions: 680 },
      { label: "Oct", revenue: 136000, users: 3500, conversions: 720 },
    ],
    weekly: [
      { label: "Week 1", revenue: 28000, users: 800, conversions: 170 },
      { label: "Week 2", revenue: 32000, users: 900, conversions: 190 },
      { label: "Week 3", revenue: 35000, users: 950, conversions: 210 },
      { label: "Week 4", revenue: 40000, users: 1000, conversions: 230 },
    ],
    daily: [
      { label: "Mon", revenue: 4200, users: 150, conversions: 32 },
      { label: "Tue", revenue: 5100, users: 180, conversions: 38 },
      { label: "Wed", revenue: 4800, users: 165, conversions: 35 },
      { label: "Thu", revenue: 5500, users: 200, conversions: 42 },
      { label: "Fri", revenue: 6200, users: 220, conversions: 47 },
      { label: "Sat", revenue: 6800, users: 240, conversions: 52 },
      { label: "Sun", revenue: 5500, users: 195, conversions: 44 },
    ]
  };
  
  // Calculate comparison stats when timeRange changes
  useEffect(() => {
    if (data.length === 0) {
      // Simulate loading data
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        // Update comparison stats based on timeRange
        if (timeRange === 'daily') {
          setComparisonStats({
            currentPeriod: "$5,500",
            previousPeriod: "$4,800",
            yearToDate: "$32,100",
            previousYear: "$28,500"
          });
        } else if (timeRange === 'weekly') {
          setComparisonStats({
            currentPeriod: "$40,000",
            previousPeriod: "$35,000",
            yearToDate: "$135,000",
            previousYear: "$120,000"
          });
        } else {
          setComparisonStats({
            currentPeriod: "$136,000",
            previousPeriod: "$125,000",
            yearToDate: "$1.25M",
            previousYear: "$980K"
          });
        }
      }, 800);
    }
  }, [timeRange, data]);
  
  const [visibleDatasets, setVisibleDatasets] = useState(['revenue', 'users', 'conversions']);
  
  const toggleDataset = (datasetName) => {
    setVisibleDatasets(prev => 
      prev.includes(datasetName) 
        ? prev.filter(d => d !== datasetName)
        : [...prev, datasetName]
    );
  };
  
  const displayData = data.length > 0 ? data : sampleData[timeRange];

  const chartData = {
    labels: displayData.map((item) => item.label),
    datasets: [
      {
        label: "Revenue",
        data: displayData.map((item) => item.revenue),
        borderColor: "rgba(79, 70, 229, 1)", // Indigo
        backgroundColor: "rgba(79, 70, 229, 0.1)",
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 4,
        pointBackgroundColor: "#fff",
        pointBorderColor: "rgba(79, 70, 229, 1)",
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "rgba(79, 70, 229, 1)",
        pointHoverBorderColor: "#fff",
        hidden: !visibleDatasets.includes('revenue'),
      },
      {
        label: "Users",
        data: displayData.map((item) => item.users),
        borderColor: "rgba(16, 185, 129, 1)", // Emerald
        backgroundColor: "rgba(16, 185, 129, 0.05)",
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 4,
        pointBackgroundColor: "#fff",
        pointBorderColor: "rgba(16, 185, 129, 1)",
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "rgba(16, 185, 129, 1)",
        pointHoverBorderColor: "#fff",
        yAxisID: 'y1',
        hidden: !visibleDatasets.includes('users'),
      },
      {
        label: "Conversions",
        data: displayData.map((item) => item.conversions),
        borderColor: "rgba(245, 158, 11, 1)", // Amber
        backgroundColor: "rgba(245, 158, 11, 0.05)",
        borderDash: [5, 5],
        fill: false,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 4,
        pointBackgroundColor: "#fff",
        pointBorderColor: "rgba(245, 158, 11, 1)",
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "rgba(245, 158, 11, 1)",
        pointHoverBorderColor: "#fff",
        yAxisID: 'y1',
        hidden: !visibleDatasets.includes('conversions'),
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: { 
        display: true,
        position: 'top',
        align: 'end',
        labels: { 
          color: "rgba(75, 85, 99, 1)",
          font: {
            size: 12,
            weight: 'bold'
          },
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          boxWidth: 8,
          boxHeight: 8,
        },
        onClick: function(e, legendItem, legend) {
          // Custom legend click handler
          const index = legendItem.datasetIndex;
          const datasetName = index === 0 ? 'revenue' : index === 1 ? 'users' : 'conversions';
          toggleDataset(datasetName);
          
          // Call the original legend click handler
          const ci = legend.chart;
          const meta = ci.getDatasetMeta(index);
          meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null;
          ci.update();
        }
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#374151",
        bodyColor: "#374151",
        borderColor: "rgba(229, 231, 235, 1)",
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          labelColor: function(context) {
            return {
              borderColor: context.dataset.borderColor,
              backgroundColor: context.dataset.borderColor,
              borderWidth: 2,
              borderRadius: 4,
            };
          },
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              if (context.datasetIndex === 0) {
                label += `$${context.parsed.y.toLocaleString()}`;
              } else {
                label += context.parsed.y.toLocaleString();
              }
            }
            return label;
          }
        }
      },
    },
    scales: {
      x: { 
        grid: {
          color: "rgba(243, 244, 246, 1)",
          drawBorder: false,
        },
        ticks: { 
          color: "rgba(107, 114, 128, 1)",
          font: {
            size: 11
          },
          padding: 10
        }
      },
      y: { 
        position: 'left',
        grid: {
          color: "rgba(243, 244, 246, 1)",
          drawBorder: false,
        },
        ticks: { 
          color: "rgba(107, 114, 128, 1)",
          font: {
            size: 11
          },
          padding: 10,
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        },
        beginAtZero: true
      },
      y1: {
        position: 'right',
        grid: {
          display: false,
        },
        ticks: { 
          color: "rgba(107, 114, 128, 1)",
          font: {
            size: 11
          },
          padding: 10
        },
        beginAtZero: true
      }
    },
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear'
      }
    },
    transitions: {
      active: {
        animation: {
          duration: 300
        }
      }
    }
  };

  // Custom legend with toggle functionality
  const customLegend = () => {
    const items = [
      { label: "Revenue", color: "rgba(79, 70, 229, 1)", name: "revenue" },
      { label: "Users", color: "rgba(16, 185, 129, 1)", name: "users" },
      { label: "Conversions", color: "rgba(245, 158, 11, 1)", name: "conversions" }
    ];
    
    return (
      <div className="flex flex-wrap gap-4">
        {items.map((item) => (
          <button
            key={item.name}
            className={`flex items-center gap-2 py-1 px-3 rounded-full text-xs font-medium transition-all ${
              visibleDatasets.includes(item.name) 
                ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white' 
                : 'bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
            }`}
            onClick={() => toggleDataset(item.name)}
          >
            <span 
              className="w-3 h-3 rounded-full" 
              style={{ 
                backgroundColor: visibleDatasets.includes(item.name) ? item.color : 'transparent',
                borderColor: item.color,
                borderWidth: '2px',
                display: 'inline-block'
              }}
            />
            {item.label}
          </button>
        ))}
      </div>
    );
  };

  // Export chart data as CSV
  const exportData = () => {
    const headers = ['Period', 'Revenue', 'Users', 'Conversions'];
    const csvContent = [
      headers.join(','),
      ...displayData.map(item => 
        [
          item.label, 
          item.revenue, 
          item.users, 
          item.conversions
        ].join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `chart_data_${timeRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle refresh data
  const refreshData = () => {
    setIsLoading(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 border border-gray-100 dark:border-gray-700 ${className}`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">{title}</h2>
        
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Custom Legend */}
          <div className="hidden md:flex">
            {customLegend()}
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {showDateRangePicker && (
              <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors flex items-center gap-1 text-sm">
                <Calendar size={16} />
                <span className="hidden md:inline">Date Range</span>
              </button>
            )}
            
            {showExport && (
              <button 
                onClick={exportData}
                className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors flex items-center gap-1 text-sm"
              >
                <Download size={16} />
                <span className="hidden md:inline">Export</span>
              </button>
            )}
            
            <button 
              onClick={refreshData}
              className={`p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors flex items-center gap-1 text-sm ${isLoading ? 'animate-spin' : ''}`}
            >
              <RefreshCw size={16} />
              <span className="hidden md:inline">Refresh</span>
            </button>
          </div>
          
          {/* Time range buttons */}
          <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button 
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${timeRange === 'daily' ? 'bg-white dark:bg-gray-600 text-gray-800 dark:text-white shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
              onClick={() => setTimeRange('daily')}
            >
              Daily
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${timeRange === 'weekly' ? 'bg-white dark:bg-gray-600 text-gray-800 dark:text-white shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
              onClick={() => setTimeRange('weekly')}
            >
              Weekly
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${timeRange === 'monthly' ? 'bg-white dark:bg-gray-600 text-gray-800 dark:text-white shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
              onClick={() => setTimeRange('monthly')}
            >
              Monthly
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile legend */}
      <div className="flex md:hidden mb-4">
        {customLegend()}
      </div>
      
      {/* Loading state */}
      <div className={`${height} relative`}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/75 dark:bg-gray-800/75 z-10 rounded-lg">
            <div className="w-10 h-10 border-4 border-gray-200 dark:border-gray-700 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin"></div>
          </div>
        )}
        <Line data={chartData} options={options} />
      </div>
      
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">This Period</p>
          <p className="text-lg font-semibold text-gray-800 dark:text-white">{comparisonStats.currentPeriod}</p>
          <div className="flex items-center mt-1">
            <span className="text-xs px-1.5 py-0.5 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">+8.8%</span>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Previous Period</p>
          <p className="text-lg font-semibold text-gray-800 dark:text-white">{comparisonStats.previousPeriod}</p>
          <div className="flex items-center mt-1">
            <span className="text-xs px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">Base</span>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Year to Date</p>
          <p className="text-lg font-semibold text-gray-800 dark:text-white">{comparisonStats.yearToDate}</p>
          <div className="flex items-center mt-1">
            <span className="text-xs px-1.5 py-0.5 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">+27.6%</span>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Previous Year</p>
          <p className="text-lg font-semibold text-gray-800 dark:text-white">{comparisonStats.previousYear}</p>
          <div className="flex items-center mt-1">
            <span className="text-xs px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">Base</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendChart;