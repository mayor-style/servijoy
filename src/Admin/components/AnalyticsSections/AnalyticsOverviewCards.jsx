import React, { useState, useEffect } from "react";
import { Users, DollarSign, ShoppingCart, Activity, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";

const AnalyticsOverviewCards = () => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalRevenue: 0,
    totalOrders: 0,
    activeSessions: 0,
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMetrics({
        totalUsers: 3500,
        totalRevenue: 125000,
        totalOrders: 890,
        activeSessions: 45,
      });
      setLoading(false);
    }, 1500);
  }, []);

  const cards = [
    { 
      title: "Total Users", 
      value: metrics.totalUsers, 
      icon: <Users size={20} />, 
      trend: 12.5,
      trendText: "vs last month",
      bgClass: "bg-gradient-to-br from-blue-500 to-blue-600",
      hoverClass: "hover:from-blue-600 hover:to-blue-700"
    },
    { 
      title: "Total Revenue", 
      value: `$${metrics.totalRevenue.toLocaleString()}`, 
      icon: <DollarSign size={20} />, 
      trend: 8.2,
      trendText: "vs last month",
      bgClass: "bg-gradient-to-br from-purple-500 to-purple-600",
      hoverClass: "hover:from-purple-600 hover:to-purple-700"
    },
    { 
      title: "Total Orders", 
      value: metrics.totalOrders, 
      icon: <ShoppingCart size={20} />, 
      trend: -3.7,
      trendText: "vs last month",
      bgClass: "bg-gradient-to-br from-green-500 to-green-600",
      hoverClass: "hover:from-green-600 hover:to-green-700"
    },
    { 
      title: "Active Sessions", 
      value: metrics.activeSessions, 
      icon: <Activity size={20} />, 
      trend: 15.8,
      trendText: "vs last month",
      bgClass: "bg-gradient-to-br from-amber-500 to-amber-600",
      hoverClass: "hover:from-amber-600 hover:to-amber-700"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 ${card.bgClass} ${card.hoverClass} text-white cursor-pointer transform hover:scale-102 hover:shadow-xl`}
        >
          {/* Card Content */}
          <div className="p-6">
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-white/30 rounded w-3/4"></div>
                <div className="h-10 bg-white/30 rounded w-1/2"></div>
                <div className="h-4 bg-white/30 rounded w-3/4"></div>
              </div>
            ) : (
              <>
                {/* Card Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center bg-white/20 p-2 rounded-lg">
                    {card.icon}
                  </div>
                  <div className={`flex items-center text-xs font-medium ${card.trend >= 0 ? 'text-green-100' : 'text-red-100'}`}>
                    {card.trend >= 0 ? (
                      <TrendingUp size={14} className="mr-1" />
                    ) : (
                      <TrendingDown size={14} className="mr-1" />
                    )}
                    <span>{Math.abs(card.trend)}%</span>
                  </div>
                </div>
                
                {/* Card Value */}
                <p className="text-3xl font-bold tracking-tight mb-1">{card.value}</p>
                
                {/* Card Title */}
                <h2 className="text-sm font-medium text-white/80">{card.title}</h2>
                
                {/* Trend */}
                <p className="text-xs mt-3 text-white/70">{card.trendText}</p>
                
                {/* View Details Link */}
                <div className="absolute bottom-4 right-4 text-xs flex items-center text-white/80 hover:text-white transition-colors">
                  <span>View Details</span>
                  <ArrowRight size={12} className="ml-1" />
                </div>
              </>
            )}
          </div>
          
          {/* Decorative Circles */}
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-white/10 rounded-full"></div>
        </div>
      ))}
    </div>
  );
};

export default AnalyticsOverviewCards;