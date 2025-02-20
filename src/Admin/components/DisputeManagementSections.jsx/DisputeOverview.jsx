import React, { useState, useEffect } from "react";
import { AlertCircle, CheckCircle2, XCircle, Clock } from "lucide-react";

export default function DisputeOverview() {
  const [loading, setLoading] = useState(true);
  const [overviewData, setOverviewData] = useState({
    totalDisputes: 0,
    pendingDisputes: 0,
    resolvedDisputes: 0,
    rejectedDisputes: 0,
  });

  useEffect(() => {
    setTimeout(() => {
      setOverviewData({
        totalDisputes: 120,
        pendingDisputes: 30,
        resolvedDisputes: 80,
        rejectedDisputes: 10,
      });
      setLoading(false);
    }, 1500);
  }, []);

  const cards = [
    {
      title: "Total Disputes",
      value: overviewData.totalDisputes,
      icon: <AlertCircle size={28} />,
      bgColor: "bg-primary",
    },
    {
      title: "Pending",
      value: overviewData.pendingDisputes,
      icon: <Clock size={28} />,
      bgColor: "bg-warning",
    },
    {
      title: "Resolved",
      value: overviewData.resolvedDisputes,
      icon: <CheckCircle2 size={28} />,
      bgColor: "bg-success",
    },
    {
      title: "Rejected",
      value: overviewData.rejectedDisputes,
      icon: <XCircle size={28} />,
      bgColor: "bg-error",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
