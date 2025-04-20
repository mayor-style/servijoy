import React, { useState, useEffect } from "react";
import { 
  TrendingUpIcon, 
  StarIcon, 
  MessageSquareIcon, 
  ChevronRightIcon,
  AwardIcon,
  ShieldCheckIcon,
  UserCheckIcon,
  ThumbsUpIcon,
  AlertCircleIcon,
  BarChartIcon,
  EyeIcon,
  LoaderIcon,
  TrendingDownIcon
} from "lucide-react";

// Sample data for testing
const sampleTrustData = {
  score: 94,
  rating: 4.2,
  totalReviews: 156,
  reviews: [
    { id: 1, text: "Great service! The vendor was very professional and completed the job quickly.", author: "Emily K.", date: "Feb 15", rating: 5 },
    { id: 2, text: "Good work overall. Would recommend for plumbing needs.", author: "James L.", date: "Feb 8", rating: 4 },
    { id: 3, text: "Responded quickly but arrived a bit late.", author: "Michelle T.", date: "Jan 30", rating: 3 }
  ],
  metrics: [
    { name: "Reliability", score: 96, icon: <ShieldCheckIcon className="h-4 w-4" /> },
    { name: "Response", score: 92, icon: <MessageSquareIcon className="h-4 w-4" /> },
    { name: "Professionalism", score: 97, icon: <UserCheckIcon className="h-4 w-4" /> },
    { name: "Value", score: 89, icon: <ThumbsUpIcon className="h-4 w-4" /> }
  ]
};

const VendorTrustScore = () => {
  // State management
  const [activeTab, setActiveTab] = useState('overview');
  const [trustData, setTrustData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Development testing toggle state
  const [showDevelopmentControls, setShowDevelopmentControls] = useState(true);
  
  // Simulate data fetching
  useEffect(() => {
    const fetchData = async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setTrustData(sampleTrustData);
      setIsLoading(false);
    };
    
    fetchData();
  }, []);
  
  // Development testing functions
  const toggleEmptyState = () => {
    setTrustData(trustData ? null : sampleTrustData);
  };
  
  const toggleLoadingState = () => {
    setIsLoading(!isLoading);
  };
  
  // Reset trust data to initial values
  const resetData = () => {
    setTrustData(sampleTrustData);
    setIsLoading(false);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<StarIcon key={i} className="h-4 w-4 fill-current text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <StarIcon className="h-4 w-4 text-gray-300" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <StarIcon className="h-4 w-4 fill-current text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(<StarIcon key={i} className="h-4 w-4 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
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
            <button 
              onClick={resetData} 
              className="px-2 py-1 text-xs bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 rounded hover:bg-yellow-300 dark:hover:bg-yellow-700 transition"
            >
              Reset Data
            </button>
          </div>
        </div>
      )}
      
      {/* Header with glow effect */}
      <div className="relative bg-gradient-to-r from-blue-600 to-emerald-500 p-6">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.2)_0%,_transparent_60%)]"></div>
        <div className="relative flex justify-between items-center">
          <h2 className="text-xl font-bold text-white flex items-center">
            <AwardIcon className="h-6 w-6 mr-2" />
            Trust Score & Ratings
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
            <span className="text-xs text-blue-100 hover:text-white cursor-pointer transition flex items-center">
              View Details <ChevronRightIcon className="h-4 w-4 ml-1" />
            </span>
          </div>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors duration-200 ${
            activeTab === 'overview' 
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Overview
        </button>
        <button 
          onClick={() => setActiveTab('metrics')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors duration-200 ${
            activeTab === 'metrics' 
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Metrics
        </button>
        <button 
          onClick={() => setActiveTab('reviews')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors duration-200 ${
            activeTab === 'reviews' 
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Reviews
        </button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center p-16 text-center">
          <div className="animate-spin mb-4">
            <LoaderIcon className="h-10 w-10 text-blue-500 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Loading trust data...</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Please wait while we fetch your trust metrics</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !trustData && (
        <div className="flex flex-col items-center justify-center p-16 text-center">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-full mb-4">
            <AwardIcon className="h-10 w-10 text-blue-500 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No trust data available</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-xs">
            Start receiving ratings and reviews to build your trust score
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition">
            Set up your profile
          </button>
        </div>
      )}

      {/* Content Area */}
      {!isLoading && trustData && (
        <div className="p-5">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-5">
              {/* Trust Score Circle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <svg className="w-20 h-20">
                      <circle 
                        cx="40" 
                        cy="40" 
                        r="36" 
                        fill="none" 
                        strokeWidth="8" 
                        stroke="rgba(99, 102, 241, 0.2)" 
                        className="dark:stroke-gray-700"
                      />
                      <circle 
                        cx="40" 
                        cy="40" 
                        r="36" 
                        fill="none" 
                        strokeWidth="8" 
                        stroke="url(#blue-gradient)" 
                        strokeDasharray={36 * 2 * Math.PI} 
                        strokeDashoffset={(36 * 2 * Math.PI) * (1 - trustData.score/100)} 
                        strokeLinecap="round" 
                        transform="rotate(-90 40 40)" 
                      />
                      <defs>
                        <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <span className="text-xl font-bold text-gray-800 dark:text-white">{trustData.score}</span>
                        <span className="text-xs text-gray-600 dark:text-gray-300">%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Trust Score</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Top 5% of vendors</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center mb-1">
                    <div className="flex mr-2">
                      {renderStars(trustData.rating)}
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{trustData.rating.toFixed(1)}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{trustData.totalReviews} reviews</p>
                </div>
              </div>
              
              {/* Trend */}
              <div className="bg-blue-50 dark:bg-gray-750 rounded-lg p-4 flex items-center space-x-3">
                <TrendingUpIcon className="h-5 w-5 text-green/50" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Trend</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Your trust score increased by 3% this month</p>
                </div>
              </div>
              
              {/* Latest Review */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Latest Feedback</h4>
                  <span className="text-xs text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">See all</span>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-750 rounded-lg p-3">
                  <div className="flex items-start">
                    <div className="bg-blue-100 dark:bg-blue-900 h-8 w-8 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                      {trustData.reviews[0].author.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-sm text-gray-900 dark:text-white">{trustData.reviews[0].author}</span>
                        <div className="flex items-center">
                          <div className="flex mr-1">
                            {renderStars(trustData.reviews[0].rating)}
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{trustData.reviews[0].date}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-300">{trustData.reviews[0].text}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Metrics Tab */}
          {activeTab === 'metrics' && (
            <div className="space-y-5">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                <BarChartIcon className="h-4 w-4 mr-2" />
                Performance Metrics
              </h3>
              
              <div className="space-y-4">
                {trustData.metrics.map((metric) => (
                  <div key={metric.name} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                        {metric.icon}
                        <span className="ml-2">{metric.name}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{metric.score}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          metric.score >= 95 ? 'bg-green/50' : 
                          metric.score >= 90 ? 'bg-blue-500' : 
                          metric.score >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                        }`} 
                        style={{ width: `${metric.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-900/30 rounded-lg p-3 flex items-start">
                <AlertCircleIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-500">Improvement Area</h4>
                  <p className="text-xs text-yellow-600 dark:text-yellow-400">Focus on improving your value score by optimizing pricing and service quality.</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Customer Reviews</h3>
                <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded-full">{trustData.totalReviews} total</span>
              </div>
              
              {trustData.reviews.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-50 dark:bg-gray-750 rounded-lg">
                  <MessageSquareIcon className="h-8 w-8 text-gray-400 dark:text-gray-500 mb-2" />
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">No reviews yet</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Once customers leave reviews, they will appear here</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {trustData.reviews.map((review) => (
                    <div key={review.id} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <div className="bg-gray-100 dark:bg-gray-700 h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium text-gray-700 dark:text-gray-300 mr-2">
                            {review.author.charAt(0)}
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{review.author}</span>
                        </div>
                        <div className="flex items-center">
                          <div className="flex mr-2">
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{review.date}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-300">{review.text}</p>
                    </div>
                  ))}
                </div>
              )}
              
              {trustData.reviews.length > 0 && (
                <button className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-150 flex items-center justify-center">
                  Load more reviews
                  <ChevronRightIcon className="h-4 w-4 ml-1" />
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VendorTrustScore;