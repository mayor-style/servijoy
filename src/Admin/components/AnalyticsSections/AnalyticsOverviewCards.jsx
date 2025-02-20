import React, { useState, useEffect } from "react";
import { Users, DollarSign, ShoppingCart, Activity } from "lucide-react";

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
    { title: "Total Users", value: metrics.totalUsers, icon: <Users size={28} />, bgColor: "bg-primary" },
    { title: "Total Revenue", value: `$${metrics.totalRevenue.toLocaleString()}`, icon: <DollarSign size={28} />, bgColor: "bg-secondary" },
    { title: "Total Orders", value: metrics.totalOrders, icon: <ShoppingCart size={28} />, bgColor: "bg-success" },
    { title: "Active Sessions", value: metrics.activeSessions, icon: <Activity size={28} />, bgColor: "bg-warning" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`p-6 rounded-lg shadow-xl ${card.bgColor} text-white transition`}
        >
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-gray-400 rounded w-3/4"></div>
              <div className="h-8 bg-gray-400 rounded w-1/2"></div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-header font-semibold">{card.title}</h2>
                {card.icon}
              </div>
              <p className="text-2xl font-bold mt-2">{card.value}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default AnalyticsOverviewCards;
