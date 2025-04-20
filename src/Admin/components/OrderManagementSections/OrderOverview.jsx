import React, { useState, useEffect } from "react";
import { CircleDollarSign, CheckCircle2, Clock, XCircle, Package, TrendingUp, TrendingDown, MoreHorizontal, RefreshCw } from "lucide-react";

export default function OrderOverview() {
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("today");
  const [refreshing, setRefreshing] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);
  
  const [overviewData, setOverviewData] = useState({
    totalOrders: 0,
    totalOrdersTrend: 0,
    pendingOrders: 0,
    pendingOrdersTrend: 0,
    completedOrders: 0,
    completedOrdersTrend: 0,
    canceledOrders: 0,
    canceledOrdersTrend: 0,
    revenue: 0,
    revenueTrend: 0,
    lastUpdated: null
  });

  // Simulated fetch data function
  const fetchData = (selectedTimeframe) => {
    setRefreshing(true);
    setTimeout(() => {
      // Different data based on selected timeframe
      const data = {
        today: {
          totalOrders: 147,
          totalOrdersTrend: 8.5,
          pendingOrders: 32,
          pendingOrdersTrend: 12.3,
          completedOrders: 105,
          completedOrdersTrend: 5.7,
          canceledOrders: 10,
          canceledOrdersTrend: -15.2,
          revenue: 12540,
          revenueTrend: 7.8,
        },
        week: {
          totalOrders: 842,
          totalOrdersTrend: 11.2,
          pendingOrders: 68,
          pendingOrdersTrend: -5.3,
          completedOrders: 721,
          completedOrdersTrend: 14.2,
          canceledOrders: 53,
          canceledOrdersTrend: -2.1,
          revenue: 56230,
          revenueTrend: 9.4,
        },
        month: {
          totalOrders: 3254,
          totalOrdersTrend: 6.7,
          pendingOrders: 185,
          pendingOrdersTrend: -8.4,
          completedOrders: 2879,
          completedOrdersTrend: 8.9,
          canceledOrders: 190,
          canceledOrdersTrend: -12.5,
          revenue: 218750,
          revenueTrend: 12.3,
        },
        year: {
          totalOrders: 28640,
          totalOrdersTrend: 24.8,
          pendingOrders: 582,
          pendingOrdersTrend: -18.3,
          completedOrders: 26890,
          completedOrdersTrend: 31.2,
          canceledOrders: 1168,
          canceledOrdersTrend: -5.7,
          revenue: 1864500,
          revenueTrend: 28.6,
        }
      };
      
      setOverviewData({
        ...data[selectedTimeframe],
        lastUpdated: new Date()
      });
      
      setLoading(false);
      setRefreshing(false);
    }, 800);
  };

  useEffect(() => {
    fetchData(timeframe);
  }, [timeframe]);

  const refreshData = () => {
    setLoading(true);
    fetchData(timeframe);
  };

  // Detailed modal content based on card type
  const getDetailedContent = (type) => {
    switch(type) {
      case 'totalOrders':
        return {
          title: 'Total Orders',
          metrics: [
            { label: 'Average order value', value: `$${(overviewData.revenue / overviewData.totalOrders).toFixed(2)}` },
            { label: 'Orders per day (avg)', value: (overviewData.totalOrders / (timeframe === 'today' ? 1 : timeframe === 'week' ? 7 : timeframe === 'month' ? 30 : 365)).toFixed(1) },
            { label: 'Most active time', value: '2:00 PM - 5:00 PM' },
            { label: 'Top source', value: 'Direct (42%)' }
          ]
        };
      case 'pendingOrders':
        return {
          title: 'Pending Orders',
          metrics: [
            { label: 'Awaiting payment', value: Math.floor(overviewData.pendingOrders * 0.35) },
            { label: 'Processing', value: Math.floor(overviewData.pendingOrders * 0.45) },
            { label: 'Ready to ship', value: Math.floor(overviewData.pendingOrders * 0.2) },
            { label: 'Average wait time', value: '6.2 hours' }
          ]
        };
      case 'completedOrders':
        return {
          title: 'Completed Orders',
          metrics: [
            { label: 'Customer satisfaction', value: '4.8/5' },
            { label: 'On-time delivery', value: '98.2%' },
            { label: 'Repeat customers', value: '64%' },
            { label: 'Average fulfillment time', value: '2.4 days' }
          ]
        };
      case 'canceledOrders':
        return {
          title: 'Canceled Orders',
          metrics: [
            { label: 'Out of stock', value: `${Math.floor(overviewData.canceledOrders * 0.28)}` },
            { label: 'Customer request', value: `${Math.floor(overviewData.canceledOrders * 0.45)}` },
            { label: 'Payment issues', value: `${Math.floor(overviewData.canceledOrders * 0.22)}` },
            { label: 'Other reasons', value: `${Math.floor(overviewData.canceledOrders * 0.05)}` }
          ]
        };
      case 'revenue':
        return {
          title: 'Revenue Generated',
          metrics: [
            { label: 'After returns', value: `$${(overviewData.revenue * 0.92).toLocaleString()}` },
            { label: 'Tax collected', value: `$${(overviewData.revenue * 0.08).toLocaleString()}` },
            { label: 'Average transaction', value: `$${(overviewData.revenue / overviewData.totalOrders).toFixed(2)}` },
            { label: 'Highest value order', value: `$${(overviewData.revenue * 0.042).toFixed(2)}` }
          ]
        };
      default:
        return { title: '', metrics: [] };
    }
  };

  const cards = [
    {
      id: 'totalOrders',
      title: "Total Orders",
      value: overviewData.totalOrders.toLocaleString(),
      trend: overviewData.totalOrdersTrend,
      icon: <Package size={24} />,
      color: "from-blue-600 to-blue-800",
      lightColor: "bg-blue-50",
      textColor: "text-blue-600",
      details: getDetailedContent('totalOrders')
    },
    {
      id: 'pendingOrders',
      title: "Pending Orders",
      value: overviewData.pendingOrders.toLocaleString(),
      trend: overviewData.pendingOrdersTrend,
      icon: <Clock size={24} />,
      color: "from-amber-500 to-amber-700",
      lightColor: "bg-amber-50",
      textColor: "text-amber-600",
      details: getDetailedContent('pendingOrders')
    },
    {
      id: 'completedOrders',
      title: "Completed Orders",
      value: overviewData.completedOrders.toLocaleString(),
      trend: overviewData.completedOrdersTrend,
      icon: <CheckCircle2 size={24} />,
      color: "from-emerald-500 to-emerald-700",
      lightColor: "bg-emerald-50",
      textColor: "text-emerald-600",
      details: getDetailedContent('completedOrders')
    },
    {
      id: 'canceledOrders',
      title: "Canceled Orders",
      value: overviewData.canceledOrders.toLocaleString(),
      trend: overviewData.canceledOrdersTrend,
      icon: <XCircle size={24} />,
      color: "from-rose-500 to-rose-700",
      lightColor: "bg-rose-50",
      textColor: "text-rose-600",
      details: getDetailedContent('canceledOrders')
    },
    {
      id: 'revenue',
      title: "Revenue Generated",
      value: `$${overviewData.revenue.toLocaleString()}`,
      trend: overviewData.revenueTrend,
      icon: <CircleDollarSign size={24} />,
      color: "from-violet-500 to-violet-700",
      lightColor: "bg-violet-50",
      textColor: "text-violet-600",
      details: getDetailedContent('revenue')
    },
  ];

  const formatDate = (date) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  return (
    <div className="space-y-4">
      {/* Header with controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 px-1">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Order Statistics</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {loading ? 'Loading data...' : `Last updated: ${formatDate(overviewData.lastUpdated)}`}
          </p>
        </div>
        
        <div className="flex mt-3 sm:mt-0 space-x-2">
          {/* Time period selector */}
          <div className="flex bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            {['today', 'week', 'month', 'year'].map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period)}
                className={`px-3 py-1.5 text-xs font-medium transition ${
                  timeframe === period
                    ? 'bg-primary text-white'
                    : 'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
          
          {/* Refresh button */}
          <button 
            onClick={refreshData}
            disabled={refreshing}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition shadow-sm"
          >
            <RefreshCw size={16} className={`${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>
      
      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {cards.map((card) => (
          <div key={card.id} className="relative group">
            <div 
              className={`h-full rounded-xl shadow-sm transition-all duration-200 bg-gradient-to-br ${card.color} overflow-hidden hover:shadow-md`}
            >
              {loading ? (
                <div className="animate-pulse p-4 h-full">
                  <div className="h-6 bg-white/20 rounded w-3/4 mb-4"></div>
                  <div className="h-8 bg-white/20 rounded w-1/2"></div>
                </div>
              ) : (
                <div className="p-5 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-sm text-white/90">{card.title}</h3>
                    <span className="p-1.5 rounded-full bg-white/10">{card.icon}</span>
                  </div>
                  
                  <div className="mt-auto">
                    <p className="text-2xl sm:text-3xl font-bold text-white mb-2">{card.value}</p>
                    
                    <div className="flex items-center text-xs">
                      <span className={`flex items-center ${card.trend >= 0 ? 'text-green-100' : 'text-rose-100'}`}>
                        {card.trend >= 0 ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                        {Math.abs(card.trend)}%
                      </span>
                      <span className="mx-1 text-white/70">vs. previous {timeframe}</span>
                    </div>
                  </div>
                  
                  {/* Info button */}
                  <button 
                    onClick={() => setExpandedCard(card.id)} 
                    className="absolute top-2 right-2 p-1 text-white/70 hover:text-white rounded-full hover:bg-white/10"
                  >
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              )}
            </div>
            
            {/* Card expanded details */}
            {expandedCard === card.id && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setExpandedCard(null)}>
                <div 
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden" 
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className={`p-4 bg-gradient-to-r ${card.color}`}>
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-white">{card.details.title} Details</h3>
                      <button onClick={() => setExpandedCard(null)} className="text-white/80 hover:text-white">
                        <XCircle size={20} />
                      </button>
                    </div>
                    <p className="text-3xl font-bold text-white mt-2">{card.value}</p>
                  </div>
                  
                  <div className="p-5">
                    <div className="grid grid-cols-2 gap-4">
                      {card.details.metrics.map((metric, idx) => (
                        <div key={idx} className={`p-3 rounded-lg ${card.lightColor}`}>
                          <p className={`text-xs ${card.textColor} font-medium`}>{metric.label}</p>
                          <p className="text-gray-900 dark:text-gray-100 font-semibold mt-1">{metric.value}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                      <button 
                        className={`w-full py-2 px-4 rounded-lg border ${card.textColor} border-current text-sm font-medium hover:bg-opacity-10 hover:bg-current transition`}
                      >
                        View Detailed Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}