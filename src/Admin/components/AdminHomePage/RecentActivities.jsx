import React, { useState, useEffect } from "react";
import { Bell, Clock, CheckCircle, AlertTriangle, UserPlus, FileCheck, CreditCard, AlertCircle } from "lucide-react";

const RecentActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(null);

  // Activity type definitions with icons and colors
  const activityTypes = {
    signup: { icon: UserPlus, color: "text-blue-500", bg: "bg-blue-100" },
    approval: { icon: FileCheck, color: "text-green-500", bg: "bg-green-100" },
    transaction: { icon: CreditCard, color: "text-purple-500", bg: "bg-purple-100" },
    dispute: { icon: AlertCircle, color: "text-red-500", bg: "bg-red-100" }
  };

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        setActivities([
          { 
            id: 1, 
            type: "signup", 
            message: "John Doe signed up as a user", 
            time: "2 mins ago",
            details: "New user registered with email johndoe@example.com from IP 192.168.1.1"
          },
          { 
            id: 2, 
            type: "approval", 
            message: "Vendor application approved for 'FixIt Services'", 
            time: "15 mins ago",
            details: "Application #APP-7823 reviewed by admin user Sarah W. Business verification complete."
          },
          { 
            id: 3, 
            type: "transaction", 
            message: "Transaction #12345 completed successfully", 
            time: "30 mins ago",
            details: "Amount: $1,500.00 | Method: Credit Card | Fee: $45.00 | Customer: James Wilson"
          },
          { 
            id: 4, 
            type: "dispute", 
            message: "New dispute raised by Sarah Connor", 
            time: "45 mins ago",
            details: "Dispute #DSP-4492 | Order #ORD-9981 | Reason: Product not as described | Amount: $124.99"
          },
          { 
            id: 5, 
            type: "transaction", 
            message: "Refund processed for Order #8876", 
            time: "1 hour ago",
            details: "Amount: $87.50 | Method: Original Payment | Customer: Maria Garcia | Reason: Customer request"
          },
          { 
            id: 6, 
            type: "signup", 
            message: "Emily Johnson joined as vendor", 
            time: "2 hours ago",
            details: "Vendor category: Home Services | Business name: 'Clean & Clear' | Verification pending"
          },
        ]);
        setLoading(false);
      }, 1200);
    };

    fetchActivities();
  }, []);

  const filteredActivities = filter === "all" 
    ? activities 
    : activities.filter(activity => activity.type === filter);

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 h-96">
        <div className="flex justify-between items-center mb-6">
          <div className="w-48 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="w-32 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex gap-3 p-4 border border-gray-100 dark:border-gray-700 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              <div className="flex-1">
                <div className="w-3/4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                <div className="w-1/4 h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 h-96 transition duration-300">
      {/* Header with title and filter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <div className="flex items-center">
          <Bell className="w-5 h-5 text-indigo-500 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Activities</h2>
          <div className="ml-2 px-2 py-1 bg-indigo-100 dark:bg-indigo-900 rounded-full text-xs font-medium text-indigo-700 dark:text-indigo-300">
            {activities.length}
          </div>
        </div>
        
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg text-sm font-medium w-full sm:w-auto">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded ${
              filter === "all" 
                ? "bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-400 shadow-sm" 
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            } transition-all duration-200`}
          >
            All
          </button>
          {Object.keys(activityTypes).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1 rounded capitalize ${
                filter === type 
                  ? "bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-400 shadow-sm" 
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              } transition-all duration-200`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      
      {/* Activity list */}
      <div className="space-y-3 overflow-y-auto max-h-64 pr-1">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity) => {
            const ActivityIcon = activityTypes[activity.type].icon;
            const isExpanded = expanded === activity.id;
            
            return (
              <div 
                key={activity.id}
                className={`border border-gray-100 dark:border-gray-700 rounded-lg transition-all duration-300 ${
                  isExpanded ? "bg-gray-50 dark:bg-gray-750" : "bg-white dark:bg-gray-800"
                } hover:shadow-md`}
              >
                <div 
                  className="p-3 flex items-start cursor-pointer"
                  onClick={() => toggleExpand(activity.id)}
                >
                  <div className={`p-2 rounded-lg ${activityTypes[activity.type].bg} mr-3 flex-shrink-0`}>
                    <ActivityIcon className={`w-5 h-5 ${activityTypes[activity.type].color}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 dark:text-gray-200 font-medium truncate">
                      {activity.message}
                    </p>
                    <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                      <Clock className="w-3 h-3 mr-1" />
                      {activity.time}
                    </div>
                  </div>
                  
                  <div className={`text-gray-400 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                {/* Expandable details section */}
                {isExpanded && (
                  <div className="px-4 pb-3 pt-1 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 animate-fadeIn">
                    {activity.details}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-gray-500 dark:text-gray-400">
            <AlertTriangle className="w-12 h-12 mb-2 opacity-50" />
            <p className="text-center">No {filter !== "all" ? filter : ""} activities found</p>
          </div>
        )}
      </div>
      
      {/* Footer with refresh indicator */}
      <div className="pt-4 mt-2 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
        <button className="flex items-center hover:text-indigo-600 dark:hover:text-indigo-400 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
        <p>Last updated just now</p>
      </div>
    </div>
  );
};

export default RecentActivities;