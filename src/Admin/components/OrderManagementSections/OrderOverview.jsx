import React, { useState, useEffect } from "react";
import { CircleDollarSign, CheckCircle2, Clock, XCircle, Package } from "lucide-react";

export default function OrderOverview() {
  const [loading, setLoading] = useState(true);
  const [overviewData, setOverviewData] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    canceledOrders: 0,
    revenue: 0,
  });

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setOverviewData({
        totalOrders: 1200,
        pendingOrders: 85,
        completedOrders: 1050,
        canceledOrders: 65,
        revenue: 75800,
      });
      setLoading(false);
    }, 1500);
  }, []);

  const cards = [
    {
      title: "Total Orders",
      value: overviewData.totalOrders,
      icon: <Package size={28} />,
      bgColor: "bg-primary",
    },
    {
      title: "Pending Orders",
      value: overviewData.pendingOrders,
      icon: <Clock size={28} />,
      bgColor: "bg-warning",
    },
    {
      title: "Completed Orders",
      value: overviewData.completedOrders,
      icon: <CheckCircle2 size={28} />,
      bgColor: "bg-success",
    },
    {
      title: "Canceled Orders",
      value: overviewData.canceledOrders,
      icon: <XCircle size={28} />,
      bgColor: "bg-error",
    },
    {
      title: "Revenue Generated",
      value: `$${overviewData.revenue.toLocaleString()}`,
      icon: <CircleDollarSign size={28} />,
      bgColor: "bg-secondary",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {cards.map((card, index) => (
        <div key={index} className={`card ${card.bgColor} text-white p-6 rounded-lg shadow-xl transition`}>
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
}
