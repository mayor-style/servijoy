import React, { useState, useEffect } from "react";
import ActivityChart from "./ActivityChart";
import ActivitySummaryCards from "./ActivitySummaryCards";

const PlatformActivityOverview = () => {
  const [loading, setLoading] = useState(true);
  const [activityData, setActivityData] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchMockData = async () => {
      setLoading(true);
      setTimeout(() => {
        if (isMounted) {
          setActivityData({
            totalSignups: 1200,
            serviceRequests: 450,
            vendorResponses: 300,
            chartData: [
              { month: "Jan", signups: 150, requests: 70, responses: 50 },
              { month: "Feb", signups: 180, requests: 80, responses: 60 },
              { month: "Mar", signups: 200, requests: 100, responses: 75 },
              { month: "Apr", signups: 220, requests: 120, responses: 90 },
            ],
          });
          setLoading(false);
        }
      }, 1500);
    };

    fetchMockData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="bg-soft-white dark:bg-gray-800 p-6 rounded-lg shadow-xl transition-colors">
      <h2 className="subheading text-gray-800 dark:text-white mb-4">
        Platform Activity Overview
      </h2>
      {loading ? (
        <div className="text-center dark:text-gray-300 py-10">
          <span className="loader">Loading Activity Data...</span>
        </div>
      ) : (
        <>
          <ActivitySummaryCards data={activityData} />
          <ActivityChart chartData={activityData.chartData} />
        </>
      )}
    </div>
  );
};

export default PlatformActivityOverview;
