import React, { useState, useEffect } from "react";
import { 
  CalendarIcon, 
  UserIcon, 
  CheckIcon, 
  XIcon, 
  ClockIcon, 
  ChevronRightIcon,
  BellIcon,
  LoaderIcon,
  MapPinIcon,
  EyeIcon
} from "lucide-react";

// Sample data for testing
const dummyRequests = [
  { id: 1, user: "Michael Johnson", service: "Plumbing Repair", date: "Feb 10, 2025", status: "pending", time: "10:00 AM", location: "123 Main St" },
  { id: 2, user: "Sarah Doe", service: "Home Cleaning", date: "Feb 12, 2025", status: "pending", time: "2:30 PM", location: "456 Oak Ave" },
  { id: 3, user: "Alex Smith", service: "Electrical Work", date: "Feb 15, 2025", status: "pending", time: "9:15 AM", location: "789 Pine Rd" },
];

const VendorBookingRequests = () => {
  // State management
  const [expandedRequest, setExpandedRequest] = useState(null);
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Development testing toggle state
  const [showDevelopmentControls, setShowDevelopmentControls] = useState(true);
  
  // Simulate data fetching
  useEffect(() => {
    const fetchData = async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setRequests(dummyRequests);
      setIsLoading(false);
    };
    
    fetchData();
  }, []);
  
  // Toggle request details expansion
  const toggleRequestDetails = (id) => {
    setExpandedRequest(expandedRequest === id ? null : id);
  };
  
  // Handle request actions
  const handleAccept = (id) => {
    setRequests(requests.map(req => 
      req.id === id ? {...req, status: "accepted"} : req
    ));
    // In a real app, you would make an API call here
  };
  
  const handleDecline = (id) => {
    setRequests(requests.map(req => 
      req.id === id ? {...req, status: "declined"} : req
    ));
    // In a real app, you would make an API call here
  };
  
  // Development testing functions
  const toggleEmptyState = () => {
    setRequests(requests.length > 0 ? [] : dummyRequests);
  };
  
  const toggleLoadingState = () => {
    setIsLoading(!isLoading);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* Development Controls - Only visible during development */}
      {showDevelopmentControls && (
        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-2 border-b border-yellow-100 dark:border-yellow-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-yellow-800 dark:text-yellow-400">Development Controls</span>
            <button 
              onClick={() => setShowDevelopmentControls(false)}
              className="text-xs text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300"
            >
              Hide
            </button>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={toggleEmptyState} 
              className="px-2 py-1 text-xs bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 rounded hover:bg-yellow-300 dark:hover:bg-yellow-700 transition"
            >
              Toggle Empty State
            </button>
            <button 
              onClick={toggleLoadingState} 
              className="px-2 py-1 text-xs bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 rounded hover:bg-yellow-300 dark:hover:bg-yellow-700 transition"
            >
              Toggle Loading State
            </button>
          </div>
        </div>
      )}
      
      {/* Header with notification badge */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <BellIcon className="h-5 w-5" />
            Booking Requests
            {!isLoading && requests.length > 0 && (
              <span className="bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-full ml-2">
                {requests.length}
              </span>
            )}
          </h2>
          <div className="flex items-center gap-2">
            {!showDevelopmentControls && (
              <button 
                onClick={() => setShowDevelopmentControls(true)}
                className="p-1 bg-blue-600/30 rounded hover:bg-blue-600/40 transition"
                title="Show Development Controls"
              >
                <EyeIcon className="h-4 w-4 text-blue-100" />
              </button>
            )}
            <button className="text-xs text-blue-100 hover:text-white transition">
              View All
            </button>
          </div>
        </div>
      </div>
      
      {/* Loading state */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <div className="animate-spin mb-4">
            <LoaderIcon className="h-8 w-8 text-blue-500 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Loading requests...</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Please wait while we fetch your booking requests</p>
        </div>
      )}
      
      {/* Empty state */}
      {!isLoading && requests.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-full mb-4">
            <CalendarIcon className="h-8 w-8 text-blue-500 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No booking requests</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">New booking requests will appear here</p>
        </div>
      )}

      {/* Booking Requests List */}
      {!isLoading && requests.length > 0 && (
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {requests.map((request) => (
            <div
              key={request.id}
              className={`transition ${
                request.status === "accepted" 
                  ? "bg-green/50 dark:bg-green/90/20" 
                  : request.status === "declined"
                  ? "bg-red-50 dark:bg-red-900/20"
                  : "hover:bg-gray-50 dark:hover:bg-gray-750"
              }`}
            >
              {/* Main request info (always visible) */}
              <div 
                className="p-4 cursor-pointer"
                onClick={() => toggleRequestDetails(request.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                      <UserIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{request.user}</h3>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <span>{request.service}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-right mr-3">
                      <div className="flex items-center text-sm font-medium text-gray-900 dark:text-gray-100">
                        <CalendarIcon className="h-4 w-4 mr-1 text-blue-500" />
                        <span>{request.date}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <ClockIcon className="h-3 w-3 mr-1" />
                        <span>{request.time}</span>
                      </div>
                    </div>
                    <ChevronRightIcon 
                      className={`h-5 w-5 text-gray-400 transition-transform ${
                        expandedRequest === request.id ? "rotate-90" : ""
                      }`} 
                    />
                  </div>
                </div>
              </div>

              {/* Expanded details and actions */}
              {expandedRequest === request.id && (
                <div className="px-4 pb-4 pt-1 bg-gray-50 dark:bg-gray-750 border-t border-gray-100 dark:border-gray-700">
                  <div className="mb-4 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <MapPinIcon className="h-3 w-3" /> Location:
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">{request.location}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Status:</p>
                        <StatusBadge status={request.status} />
                      </div>
                    </div>
                  </div>
                  
                  {request.status === "pending" && (
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => handleAccept(request.id)}
                        className="flex-1 flex items-center justify-center px-4 py-2 bg-green/60 hover:bg-green/70 text-white text-sm font-medium rounded-lg transition duration-150 ease-in-out"
                      >
                        <CheckIcon className="h-4 w-4 mr-1" />
                        Accept
                      </button>
                      <button 
                        onClick={() => handleDecline(request.id)}
                        className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm font-medium rounded-lg transition duration-150 ease-in-out"
                      >
                        <XIcon className="h-4 w-4 mr-1" />
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Status badge component
const StatusBadge = ({ status }) => {
  switch (status) {
    case "accepted":
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green/80 dark:bg-green/90 dark:text-green/20">
          <CheckIcon className="h-3 w-3 mr-1" />
          Accepted
        </span>
      );
    case "declined":
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
          <XIcon className="h-3 w-3 mr-1" />
          Declined
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
          <ClockIcon className="h-3 w-3 mr-1" />
          Pending
        </span>
      );
  }
};

export default VendorBookingRequests;