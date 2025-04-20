import React, { useState, useEffect } from "react";
import { LineChart, BarChart, PieChart, Line, Bar, Cell, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { AlertTriangle, ArrowDown, ArrowUp, Users, FileText, CheckCircle, Calendar, TrendingUp, ChevronDown, ChevronUp, RefreshCw, Download } from "lucide-react";

// Manual implementation of shadcn UI components

// Card Components
const Card = ({ className, children }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border ${className || ''}`}>
      {children}
    </div>
  );
};

const CardHeader = ({ className, children }) => {
  return (
    <div className={`px-4 py-4 ${className || ''}`}>
      {children}
    </div>
  );
};

const CardTitle = ({ className, children }) => {
  return (
    <h3 className={`font-bold text-xl text-gray-900 dark:text-white ${className || ''}`}>
      {children}
    </h3>
  );
};

const CardDescription = ({ className, children }) => {
  return (
    <p className={`text-gray-500 dark:text-gray-400 text-sm ${className || ''}`}>
      {children}
    </p>
  );
};

const CardContent = ({ className, children }) => {
  return (
    <div className={`px-4 py-2 ${className || ''}`}>
      {children}
    </div>
  );
};

const CardFooter = ({ className, children }) => {
  return (
    <div className={`px-4 py-3 border-t ${className || ''}`}>
      {children}
    </div>
  );
};

// Tabs Components
const Tabs = ({ defaultValue, className, children }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  
  // Find the active tab content
  const activeContent = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.props.value === activeTab
  );
  
  // Pass the activeTab and setActiveTab to TabsList for triggers
  const tabsList = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === TabsList) {
      return React.cloneElement(child, { activeTab, setActiveTab });
    }
    return child;
  });
  
  return (
    <div className={className || ''}>
      {tabsList}
      {activeContent}
    </div>
  );
};

const TabsList = ({ className, children, activeTab, setActiveTab }) => {
  // Clone children to pass activeTab and setActiveTab to TabsTrigger
  const triggers = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === TabsTrigger) {
      return React.cloneElement(child, { activeTab, setActiveTab });
    }
    return child;
  });
  
  return (
    <div className={`flex space-x-2 ${className || ''}`}>
      {triggers}
    </div>
  );
};

const TabsTrigger = ({ value, children, activeTab, setActiveTab }) => {
  const isActive = value === activeTab;
  
  return (
    <button
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
        isActive 
          ? 'bg-white dark:bg-gray-700 shadow-sm text-indigo-600 dark:text-indigo-400' 
          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
      }`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
};

const TabsContent = ({ value, className, children }) => {
  return (
    <div className={className || ''} data-value={value}>
      {children}
    </div>
  );
};

// Select Components
const Select = ({ value, onValueChange, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  
  // Clone the trigger to pass selectedValue
  const trigger = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === SelectTrigger) {
      return React.cloneElement(child, { 
        value: selectedValue, 
        onClick: () => setIsOpen(!isOpen) 
      });
    }
    return child;
  });
  
  // Clone the content to pass onValueChange and setIsOpen
  const content = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === SelectContent) {
      return React.cloneElement(child, { 
        isOpen, 
        onValueChange: (val) => {
          setSelectedValue(val);
          onValueChange(val);
          setIsOpen(false);
        }
      });
    }
    return child;
  });
  
  return (
    <div className="relative">
      {trigger}
      {content}
    </div>
  );
};

const SelectTrigger = ({ className, children, value, onClick }) => {
  return (
    <button 
      className={`flex items-center justify-between px-3 py-2 text-sm border rounded-md ${className || ''}`}
      onClick={onClick}
    >
      {children}
      <ChevronDown className="ml-2 h-4 w-4" />
    </button>
  );
};

const SelectContent = ({ children, isOpen, onValueChange }) => {
  if (!isOpen) return null;
  
  // Clone items to pass the onValueChange
  const items = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === SelectItem) {
      return React.cloneElement(child, { 
        onClick: () => onValueChange(child.props.value)
      });
    }
    return child;
  });
  
  return (
    <div className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg p-1 border dark:border-gray-700">
      {items}
    </div>
  );
};

const SelectItem = ({ value, children, onClick }) => {
  return (
    <div 
      className="px-2 py-1.5 text-sm rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const SelectValue = ({ placeholder }) => {
  return <span>{placeholder}</span>;
};

const PlatformActivityOverview = () => {
  const [loading, setLoading] = useState(true);
  const [activityData, setActivityData] = useState(null);
  const [viewMode, setViewMode] = useState("month");
  const [chartType, setChartType] = useState("line");
  const [timeframe, setTimeframe] = useState("3m");
  const [expandedCard, setExpandedCard] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444"];
  
  const fetchData = () => {
    setRefreshing(true);
    setTimeout(() => {
      const mockData = {
        totalSignups: 1287,
        serviceRequests: 483,
        vendorResponses: 324,
        completionRate: 67.2,
        trendsPercentages: {
          signups: 12.4,
          requests: 8.7,
          responses: 15.2,
          completion: -3.5
        },
        chartData: {
          daily: [
            { date: "Mon", signups: 45, requests: 25, responses: 18, completion: 72 },
            { date: "Tue", signups: 52, requests: 31, responses: 21, completion: 68 },
            { date: "Wed", signups: 49, requests: 28, responses: 23, completion: 82 },
            { date: "Thu", signups: 63, requests: 35, responses: 27, completion: 77 },
            { date: "Fri", signups: 57, requests: 33, responses: 25, completion: 76 },
            { date: "Sat", signups: 28, requests: 15, responses: 9, completion: 60 },
            { date: "Sun", signups: 22, requests: 11, responses: 6, completion: 55 }
          ],
          weekly: [
            { date: "W1", signups: 295, requests: 132, responses: 98, completion: 74 },
            { date: "W2", signups: 312, requests: 145, responses: 107, completion: 73 },
            { date: "W3", signups: 328, requests: 156, responses: 119, completion: 76 },
            { date: "W4", signups: 352, requests: 168, responses: 125, completion: 74 }
          ],
          monthly: [
            { date: "Jan", signups: 1150, requests: 470, responses: 350, completion: 74 },
            { date: "Feb", signups: 1230, requests: 485, responses: 367, completion: 76 },
            { date: "Mar", signups: 1287, requests: 483, responses: 324, completion: 67 },
            { date: "Apr", signups: 1184, requests: 502, responses: 358, completion: 71 }
          ],
          quarterly: [
            { date: "Q1", signups: 3667, requests: 1438, responses: 1041, completion: 72 },
            { date: "Q2", signups: 3952, requests: 1578, responses: 1187, completion: 75 },
            { date: "Q3", signups: 4236, requests: 1692, responses: 1243, completion: 73 },
            { date: "Q4", signups: 3982, requests: 1523, responses: 1090, completion: 71 }
          ]
        },
        distribution: {
          userTypes: [
            { name: "Customers", value: 62 },
            { name: "Vendors", value: 28 },
            { name: "Administrators", value: 4 },
            { name: "Guest Users", value: 6 }
          ],
          serviceCategories: [
            { name: "Home Repair", value: 35 },
            { name: "Cleaning", value: 25 },
            { name: "Professional", value: 20 },
            { name: "Other", value: 20 }
          ]
        },
        peakTimes: {
          signups: "2PM - 6PM",
          requests: "9AM - 12PM",
          responses: "10AM - 2PM"
        }
      };
      
      setActivityData(mockData);
      setLoading(false);
      setRefreshing(false);
    }, 1200);
  };

  useEffect(() => {
    let isMounted = true;
    
    const fetchMockData = async () => {
      setLoading(true);
      setTimeout(() => {
        if (isMounted) {
          fetchData();
        }
      }, 1500);
    };

    fetchMockData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleRefresh = () => {
    fetchData();
  };

  // Helper function to select the right data based on timeframe
  const getTimeframeData = () => {
    if (!activityData) return [];
    
    switch(viewMode) {
      case "day":
        return activityData.chartData.daily;
      case "week":
        return activityData.chartData.weekly;
      case "quarter":
        return activityData.chartData.quarterly;
      case "month":
      default:
        return activityData.chartData.monthly;
    }
  };

  const toggleCardExpand = (cardId) => {
    if (expandedCard === cardId) {
      setExpandedCard(null);
    } else {
      setExpandedCard(cardId);
    }
  };

  // Skeleton loader for all content
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl transition-colors">
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
        
        {/* Skeleton for cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 animate-pulse">
              <div className="h-5 w-1/2 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
              <div className="h-8 w-1/3 bg-gray-200 dark:bg-gray-600 rounded mb-3"></div>
              <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-600 rounded"></div>
            </div>
          ))}
        </div>
        
        {/* Skeleton for chart */}
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 h-80 animate-pulse">
          <div className="h-full w-full flex items-center justify-center">
            <div className="h-4 w-40 bg-gray-200 dark:bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const chartData = getTimeframeData();

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl transition-colors">
      {/* Header with controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
            <TrendingUp className="mr-2 h-6 w-6 text-indigo-500" />
            Platform Activity Overview
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Comprehensive overview of platform engagement metrics
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3 items-center">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-32 h-9 text-sm bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="1m">Last month</SelectItem>
              <SelectItem value="3m">Last 3 months</SelectItem>
              <SelectItem value="6m">Last 6 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button 
              onClick={() => setViewMode("day")}
              className={`px-3 py-1 text-sm rounded-md transition ${viewMode === "day" ? "bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-gray-600 dark:text-gray-300"}`}
            >
              Daily
            </button>
            <button 
              onClick={() => setViewMode("week")}
              className={`px-3 py-1 text-sm rounded-md transition ${viewMode === "week" ? "bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-gray-600 dark:text-gray-300"}`}
            >
              Weekly
            </button>
            <button 
              onClick={() => setViewMode("month")}
              className={`px-3 py-1 text-sm rounded-md transition ${viewMode === "month" ? "bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-gray-600 dark:text-gray-300"}`}
            >
              Monthly 
            </button>
            <button 
              onClick={() => setViewMode("quarter")}
              className={`px-3 py-1 text-sm rounded-md transition ${viewMode === "quarter" ? "bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-gray-600 dark:text-gray-300"}`}
            >
              Quarterly
            </button>
          </div>
          
          <button 
            onClick={handleRefresh} 
            disabled={refreshing}
            className={`p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition ${refreshing ? "animate-spin" : ""}`}
          >
            <RefreshCw className="h-4 w-4" />
          </button>

          <button className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Card 1: Total Signups */}
        <Card className={`overflow-hidden transition-all duration-300 border-gray-200 dark:border-gray-700 ${expandedCard === 'signups' ? 'row-span-2' : ''}`}>
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 p-4 pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardDescription className="text-gray-600 dark:text-gray-400 font-medium mb-1">Total Signups</CardDescription>
                <CardTitle className="text-2xl font-bold">{activityData.totalSignups.toLocaleString()}</CardTitle>
              </div>
              <div 
                className={`rounded-full p-2 ${activityData.trendsPercentages.signups >= 0 ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`}
              >
                {activityData.trendsPercentages.signups >= 0 ? 
                  <ArrowUp className="h-5 w-5" /> : 
                  <ArrowDown className="h-5 w-5" />
                }
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm">
              <span className={activityData.trendsPercentages.signups >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                {activityData.trendsPercentages.signups >= 0 ? '+' : ''}{activityData.trendsPercentages.signups}%
              </span>
              <span className="text-gray-500 dark:text-gray-400 ml-1">vs last period</span>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <Users className="w-4 h-4 inline mr-1" />
                Peak time: {activityData.peakTimes.signups}
              </div>
              <button 
                onClick={() => toggleCardExpand('signups')}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
              >
                {expandedCard === 'signups' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
            </div>
            
            {expandedCard === 'signups' && (
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 animate-fadeIn">
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="signups" stroke="#4F46E5" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-gray-500 dark:text-gray-400 text-xs">Daily Avg</p>
                    <p className="font-bold">{Math.round(activityData.totalSignups / 30)}</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-gray-500 dark:text-gray-400 text-xs">Conversion</p>
                    <p className="font-bold">23.6%</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Card 2: Service Requests */}
        <Card className={`overflow-hidden transition-all duration-300 border-gray-200 dark:border-gray-700 ${expandedCard === 'requests' ? 'row-span-2' : ''}`}>
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 p-4 pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardDescription className="text-gray-600 dark:text-gray-400 font-medium mb-1">Service Requests</CardDescription>
                <CardTitle className="text-2xl font-bold">{activityData.serviceRequests.toLocaleString()}</CardTitle>
              </div>
              <div 
                className={`rounded-full p-2 ${activityData.trendsPercentages.requests >= 0 ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`}
              >
                {activityData.trendsPercentages.requests >= 0 ? 
                  <ArrowUp className="h-5 w-5" /> : 
                  <ArrowDown className="h-5 w-5" />
                }
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm">
              <span className={activityData.trendsPercentages.requests >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                {activityData.trendsPercentages.requests >= 0 ? '+' : ''}{activityData.trendsPercentages.requests}%
              </span>
              <span className="text-gray-500 dark:text-gray-400 ml-1">vs last period</span>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <FileText className="w-4 h-4 inline mr-1" />
                Peak time: {activityData.peakTimes.requests}
              </div>
              <button 
                onClick={() => toggleCardExpand('requests')}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
              >
                {expandedCard === 'requests' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
            </div>
            
            {expandedCard === 'requests' && (
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 animate-fadeIn">
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={activityData.distribution.serviceCategories}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {activityData.distribution.serviceCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-xs text-center mt-2 text-gray-500 dark:text-gray-400">
                  Service category distribution
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Card 3: Vendor Responses */}
        <Card className={`overflow-hidden transition-all duration-300 border-gray-200 dark:border-gray-700 ${expandedCard === 'responses' ? 'row-span-2' : ''}`}>
          <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 p-4 pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardDescription className="text-gray-600 dark:text-gray-400 font-medium mb-1">Vendor Responses</CardDescription>
                <CardTitle className="text-2xl font-bold">{activityData.vendorResponses.toLocaleString()}</CardTitle>
              </div>
              <div 
                className={`rounded-full p-2 ${activityData.trendsPercentages.responses >= 0 ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`}
              >
                {activityData.trendsPercentages.responses >= 0 ? 
                  <ArrowUp className="h-5 w-5" /> : 
                  <ArrowDown className="h-5 w-5" />
                }
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm">
              <span className={activityData.trendsPercentages.responses >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                {activityData.trendsPercentages.responses >= 0 ? '+' : ''}{activityData.trendsPercentages.responses}%
              </span>
              <span className="text-gray-500 dark:text-gray-400 ml-1">vs last period</span>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <CheckCircle className="w-4 h-4 inline mr-1" />
                Peak time: {activityData.peakTimes.responses}
              </div>
              <button 
                onClick={() => toggleCardExpand('responses')}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
              >
                {expandedCard === 'responses' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
            </div>
            
            {expandedCard === 'responses' && (
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 animate-fadeIn">
                <div className="text-sm font-medium mb-2">Response Time</div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                      <span>Under 1 hour</span>
                      <span>64%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
                      <div className="h-full bg-amber-500 rounded" style={{ width: '64%' }}></div>
                      </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                      <span>1-4 hours</span>
                      <span>21%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
                      <div className="h-full bg-amber-400 rounded" style={{ width: '21%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                      <span>4-24 hours</span>
                      <span>13%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
                      <div className="h-full bg-amber-300 rounded" style={{ width: '13%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                      <span>Over 24 hours</span>
                      <span>2%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
                      <div className="h-full bg-amber-200 rounded" style={{ width: '2%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Card 4: Completion Rate */}
        <Card className={`overflow-hidden transition-all duration-300 border-gray-200 dark:border-gray-700 ${expandedCard === 'completion' ? 'row-span-2' : ''}`}>
          <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-4 pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardDescription className="text-gray-600 dark:text-gray-400 font-medium mb-1">Completion Rate</CardDescription>
                <CardTitle className="text-2xl font-bold">{activityData.completionRate}%</CardTitle>
              </div>
              <div 
                className={`rounded-full p-2 ${activityData.trendsPercentages.completion >= 0 ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`}
              >
                {activityData.trendsPercentages.completion >= 0 ? 
                  <ArrowUp className="h-5 w-5" /> : 
                  <ArrowDown className="h-5 w-5" />
                }
              </div>
            </div>
            <div className="flex items-center mt-1 text-sm">
              <span className={activityData.trendsPercentages.completion >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                {activityData.trendsPercentages.completion >= 0 ? '+' : ''}{activityData.trendsPercentages.completion}%
              </span>
              <span className="text-gray-500 dark:text-gray-400 ml-1">vs last period</span>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="w-4 h-4 inline mr-1" />
                Target: 75%
              </div>
              <button 
                onClick={() => toggleCardExpand('completion')}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
              >
                {expandedCard === 'completion' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
            </div>
            
            {expandedCard === 'completion' && (
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 animate-fadeIn">
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="completion" stroke="#EF4444" strokeWidth={2} />
                      {/* Target line */}
                      <Line 
                        type="monotone" 
                        dataKey={() => 75} 
                        stroke="#9CA3AF" 
                        strokeWidth={1}
                        strokeDasharray="4 4"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                {activityData.completionRate < 75 && (
                  <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg border border-red-100 dark:border-red-800/30 flex items-center text-sm">
                    <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>Below target completion rate of 75%. Consider reviewing vendor onboarding process.</span>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Main Chart */}
      <Card className="mb-6 border-gray-200 dark:border-gray-700">
        <CardHeader className="pb-0">
          <div className="flex justify-between items-center mb-2">
            <CardTitle>Activity Trends</CardTitle>
            <div className="flex space-x-1">
              <button 
                onClick={() => setChartType("line")}
                className={`p-1 px-2 text-xs rounded ${chartType === "line" ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400" : "text-gray-600 dark:text-gray-400"}`}
              >
                Line
              </button>
              <button 
                onClick={() => setChartType("bar")}
                className={`p-1 px-2 text-xs rounded ${chartType === "bar" ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400" : "text-gray-600 dark:text-gray-400"}`}
              >
                Bar
              </button>
            </div>
          </div>
          <CardDescription>
            Comparison of key platform metrics over time
          </CardDescription>
        </CardHeader>
        <CardContent className="h-80 pt-4">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "line" ? (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="signups" name="New Users" stroke="#4F46E5" strokeWidth={2} />
                <Line yAxisId="left" type="monotone" dataKey="requests" name="Service Requests" stroke="#10B981" strokeWidth={2} />
                <Line yAxisId="left" type="monotone" dataKey="responses" name="Vendor Responses" stroke="#F59E0B" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="completion" name="Completion Rate (%)" stroke="#EF4444" strokeWidth={2} />
              </LineChart>
            ) : (
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="signups" name="New Users" fill="#4F46E5" />
                <Bar yAxisId="left" dataKey="requests" name="Service Requests" fill="#10B981" />
                <Bar yAxisId="left" dataKey="responses" name="Vendor Responses" fill="#F59E0B" />
                <Bar yAxisId="right" dataKey="completion" name="Completion Rate (%)" fill="#EF4444" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      {/* Tabbed Interface for Additional Insights */}
      <Tabs defaultValue="distribution" className="w-full">
        <TabsList className="border-b border-gray-200 dark:border-gray-700 mb-4">
          <TabsTrigger value="distribution">User Distribution</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="forecast">Forecast</TabsTrigger>
        </TabsList>
        
        <TabsContent value="distribution" className="animate-in fade-in-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Type Distribution</CardTitle>
                <CardDescription>Breakdown of platform users by type</CardDescription>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={activityData.distribution.userTypes}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={90}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {activityData.distribution.userTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Service Categories</CardTitle>
                <CardDescription>Most popular service categories</CardDescription>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={activityData.distribution.serviceCategories}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    <Bar dataKey="value" fill="#10B981">
                      {activityData.distribution.serviceCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="engagement" className="animate-in fade-in-50">
          <Card>
            <CardHeader>
              <CardTitle>User Engagement Metrics</CardTitle>
              <CardDescription>Analysis of platform engagement patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Avg. Session Duration</div>
                  <div className="text-2xl font-bold">8:42</div>
                  <div className="flex items-center mt-2 text-xs text-green-600 dark:text-green-400">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    <span>12.3% vs last period</span>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Requests per User</div>
                  <div className="text-2xl font-bold">2.7</div>
                  <div className="flex items-center mt-2 text-xs text-green-600 dark:text-green-400">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    <span>5.8% vs last period</span>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Retention Rate</div>
                  <div className="text-2xl font-bold">68.5%</div>
                  <div className="flex items-center mt-2 text-xs text-red-600 dark:text-red-400">
                    <ArrowDown className="h-3 w-3 mr-1" />
                    <span>2.1% vs last period</span>
                  </div>
                </div>
              </div>
              
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    {day: "Mon", returning: 146, new: 95},
                    {day: "Tue", returning: 152, new: 110},
                    {day: "Wed", returning: 158, new: 133},
                    {day: "Thu", returning: 165, new: 147},
                    {day: "Fri", returning: 172, new: 138},
                    {day: "Sat", returning: 123, new: 72},
                    {day: "Sun", returning: 115, new: 66}
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="returning" name="Returning Users" stroke="#4F46E5" strokeWidth={2} />
                    <Line type="monotone" dataKey="new" name="New Users" stroke="#F59E0B" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="forecast" className="animate-in fade-in-50">
          <Card>
            <CardHeader>
              <CardTitle>Growth Forecast</CardTitle>
              <CardDescription>Projected platform growth for next quarter</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    {month: "Apr", actual: 1287, forecast: 1287},
                    {month: "May", actual: null, forecast: 1352},
                    {month: "Jun", actual: null, forecast: 1428},
                    {month: "Jul", actual: null, forecast: 1513}
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="actual" name="Actual Signups" stroke="#4F46E5" strokeWidth={2} />
                    <Line type="monotone" dataKey="forecast" name="Forecast Signups" stroke="#9CA3AF" strokeWidth={2} strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800/30">
                  <div className="text-sm font-medium text-indigo-700 dark:text-indigo-400 mb-1">Projected Growth</div>
                  <div className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">17.6%</div>
                  <div className="text-xs text-indigo-600 dark:text-indigo-500 mt-1">Quarter-over-quarter</div>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-100 dark:border-emerald-800/30">
                  <div className="text-sm font-medium text-emerald-700 dark:text-emerald-400 mb-1">Projected Requests</div>
                  <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">1,742</div>
                  <div className="text-xs text-emerald-600 dark:text-emerald-500 mt-1">Next quarter total</div>
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800/30">
                  <div className="text-sm font-medium text-amber-700 dark:text-amber-400 mb-1">Expected Vendors</div>
                  <div className="text-2xl font-bold text-amber-700 dark:text-amber-400">325</div>
                  <div className="text-xs text-amber-600 dark:text-amber-500 mt-1">Active by quarter end</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Footer */}
      <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
        <p>Last updated: March 18, 2025 • Data refreshes every 24 hours</p>
      </div>
    </div>
  );
};

export default PlatformActivityOverview;
