import React, { useState, useEffect } from "react";
import { 
  Wallet, 
  DollarSign, 
  ArrowUp, 
  ArrowDown, 
  ArrowRight, 
  TrendingUp, 
  History, 
  Calendar, 
  AlertTriangle, 
  Loader,
  Code
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const VendorEarnings = () => {
  // State management
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [earningsData, setEarningsData] = useState(null);
  const [showWithdrawOptions, setShowWithdrawOptions] = useState(false);

  // Development testing toggle state
  const [showDevControls, setShowDevControls] = useState(true);
  const [useEmptyState, setUseEmptyState] = useState(false);
  
  const navigate = useNavigate();

  // Mock data
  const mockData = {
    totalEarnings: 12540,
    availableBalance: 3250,
    expectedPayout: 850,
    lastPayout: 1200,
    monthlyData: [2100, 1850, 2300, 1950, 2540, 1800],
    percentageChange: 12.5,
    nextPayoutDays: 3
  };

  // Empty mock data
  const emptyData = {
    totalEarnings: 0,
    availableBalance: 0,
    expectedPayout: 0,
    lastPayout: 0,
    monthlyData: [0, 0, 0, 0, 0, 0],
    percentageChange: 0,
    nextPayoutDays: 0
  };

  // Fetch data effect (simulated API call)
  useEffect(() => {
    const fetchEarningsData = async () => {
      try {
        setIsLoading(true);
        setTimeout(() => {
          setEarningsData(useEmptyState ? emptyData : mockData);
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Error fetching earnings data:", error);
        setHasError(true);
        setIsLoading(false);
      }
    };

    fetchEarningsData();
  }, [useEmptyState]);

  const handleViewTransactions = () => {
    navigate('/dashboard/earnings/transactions');
  };

  // Toggle development controls visibility
  const toggleDevControls = () => {
    setShowDevControls(!showDevControls);
  };

  // Development Controls Panel
  const DevControlsPanel = () => (
    <div className="bg-yellow-50 dark:bg-yellow-900/30 p-2 border-b border-yellow-100 dark:border-yellow-800">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-yellow-800 dark:text-yellow-400">
          Development Controls
        </span>
        <button 
          onClick={toggleDevControls}
          className="text-xs text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300"
        >
          Hide
        </button>
      </div>
      <div className="flex space-x-2">
        <button 
          onClick={() => setUseEmptyState(!useEmptyState)}
          className={`px-2 py-1 text-xs rounded transition ${
            useEmptyState 
              ? 'bg-yellow-200 text-yellow-800' 
              : 'bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200'
          } hover:bg-yellow-300 dark:hover:bg-yellow-700`}
        >
          Toggle Empty State
        </button>
        <button 
          onClick={() => {
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 3000);
          }}
          className="px-2 py-1 text-xs bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 rounded hover:bg-yellow-300 dark:hover:bg-yellow-700 transition"
        >
          Force Loading
        </button>
        <button 
          onClick={() => setHasError(!hasError)}
          className={`px-2 py-1 text-xs rounded transition ${
            hasError 
              ? 'bg-yellow-200 text-yellow-800' 
              : 'bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200'
          } hover:bg-yellow-300 dark:hover:bg-yellow-700`}
        >
          Toggle Error
        </button>
      </div>
    </div>
  );

  // Development Mode Toggle (appears when DevControlsPanel is hidden)
  const DevModeToggle = () => (
    <button 
      onClick={toggleDevControls}
      className="fixed bottom-4 right-4 z-50 bg-gray-800/70 hover:bg-gray-700 text-purple-300 p-2 rounded-full shadow-lg transition-all"
      title="Show Development Controls"
    >
      <Code />
    </button>
  );

  // Loading state component
  const LoadingState = () => (
    <div className="text-center py-16 px-4 animate-pulse">
      <Loader className="text-4xl text-indigo-300 mx-auto animate-spin mb-4" />
      <h3 className="text-xl font-bold">Loading Earnings Data...</h3>
    </div>
  );

  // Error state component
  const ErrorState = () => (
    <div className="text-center py-8 px-4">
      <div className="bg-red-500/20 p-6 rounded-xl backdrop-blur-sm inline-block mb-4">
        <AlertTriangle className="text-4xl text-red-400 mx-auto" />
      </div>
      <h3 className="text-xl font-bold mb-2">Something Went Wrong</h3>
      <p className="text-indigo-200 max-w-md mx-auto mb-6">
        We couldn't load your earnings data. Please try again later or contact support if the problem persists.
      </p>
      <button 
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
      >
        Try Again
      </button>
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="text-center py-8 px-4">
      <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm inline-block mb-4">
        <AlertTriangle className="text-4xl text-yellow-300 mx-auto" />
      </div>
      <h3 className="text-xl font-bold mb-2">No Earnings Data Yet</h3>
      <p className="text-indigo-200 max-w-md mx-auto mb-6">
        Once you start making sales, your earnings information will appear here. Keep promoting your products!
      </p>
      <button 
        onClick={() => navigate('/dashboard/products')}
        className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
      >
        View My Products
      </button>
    </div>
  );

  // Render appropriate state based on loading, error, or empty data
  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 dark:from-indigo-900 dark:to-purple-950 text-white p-6 rounded-2xl shadow-xl border border-indigo-400/30 dark:border-indigo-700/30 overflow-hidden relative">
        {showDevControls ? <DevControlsPanel /> : <DevModeToggle />}
        <LoadingState />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 dark:from-indigo-900 dark:to-purple-950 text-white p-6 rounded-2xl shadow-xl border border-indigo-400/30 dark:border-indigo-700/30 overflow-hidden relative">
        {showDevControls ? <DevControlsPanel /> : <DevModeToggle />}
        <ErrorState />
      </div>
    );
  }

  if (!earningsData || (earningsData.totalEarnings === 0 && earningsData.availableBalance === 0)) {
    return (
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 dark:from-indigo-900 dark:to-purple-950 text-white p-6 rounded-2xl shadow-xl border border-indigo-400/30 dark:border-indigo-700/30 overflow-hidden relative">
        {showDevControls ? <DevControlsPanel /> : <DevModeToggle />}
        <EmptyState />
      </div>
    );
  }

  // Main content rendering with data
  return (
    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 dark:from-indigo-900 dark:to-purple-950 text-white p-6 rounded-2xl shadow-xl border border-indigo-400/30 dark:border-indigo-700/30 overflow-hidden relative">
      {showDevControls ? <DevControlsPanel /> : <DevModeToggle />}
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-xl -ml-10 -mb-10"></div>
      
      {/* Header with mini chart */}
      <div className="flex justify-between items-center mb-6 relative">
        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <TrendingUp className="text-yellow-300" /> 
          <span>Earnings & Payouts</span>
        </h2>
        <div className="hidden md:flex items-end h-12 gap-1">
          {earningsData.monthlyData.map((value, index) => (
            <div 
              key={index} 
              className="w-2 bg-white/30 hover:bg-yellow-300 transition-all rounded-t"
              style={{ height: `${Math.max((value/3000) * 100, 5)}%` }}
              title={`₦${value.toLocaleString()}`}
            ></div>
          ))}
        </div>
      </div>

      {/* Main cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Total Earnings Card */}
        <div className="bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 rounded-xl overflow-hidden">
          <div className="p-5 flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <DollarSign className="text-2xl text-yellow-300" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-indigo-100 font-medium">
                Total Earnings
              </p>
              <h3 className="text-3xl font-bold mt-1">
                ₦{earningsData.totalEarnings.toLocaleString()}
              </h3>
            </div>
          </div>
          <div className="px-5 py-3 bg-black/10 flex justify-between items-center text-xs">
            <span className="flex items-center gap-1 text-green-300">
              <ArrowUp className="h-4 w-4" /> +{earningsData.percentageChange}% vs last month
            </span>
            <button 
              onClick={handleViewTransactions}
              className="text-indigo-200 hover:text-white flex items-center gap-1"
            >
              <History className="h-4 w-4" /> History
            </button>
          </div>
        </div>

        {/* Available Balance Card */}
        <div className="bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 rounded-xl overflow-hidden">
          <div className="p-5 flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <Wallet className="text-2xl text-green-300" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-indigo-100 font-medium">
                Available Balance
              </p>
              <h3 className="text-3xl font-bold mt-1">
                ₦{earningsData.availableBalance.toLocaleString()}
              </h3>
            </div>
          </div>
          <div className="px-5 py-3 bg-black/10 flex justify-between items-center">
            <span className="text-xs flex items-center gap-1">
              <Calendar className="text-indigo-200" /> 
              {earningsData.nextPayoutDays > 0 
                ? `Next payout in ${earningsData.nextPayoutDays} days` 
                : "No pending payouts"}
            </span>
            <button 
              onClick={() => setShowWithdrawOptions(!showWithdrawOptions)}
              className={`text-xs px-3 py-1 ${
                earningsData.availableBalance > 0
                  ? "bg-green-300 hover:bg-green-500" 
                  : "bg-gray-500/50 cursor-not-allowed"
              } rounded-lg transition-colors`}
              disabled={earningsData.availableBalance === 0}
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>

      {/* Withdraw options panel */}
      {showWithdrawOptions && (
        <div className="mb-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl animate-fadeIn">
          <h4 className="text-sm font-medium mb-3">Select withdrawal method</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button 
              onClick={() => navigate('/dashboard/earnings/withdraw/bank')}
              className="p-3 bg-black/20 hover:bg-black/40 rounded-lg text-sm text-center transition-colors"
            >
              Bank Transfer
            </button>
            <button 
              onClick={() => navigate('/dashboard/earnings/withdraw/wallet')}
              className="p-3 bg-black/20 hover:bg-black/40 rounded-lg text-sm text-center transition-colors"
            >
              Wallet
            </button>
            <button 
              onClick={() => navigate('/dashboard/earnings/withdraw/options')}
              className="p-3 bg-black/20 hover:bg-black/40 rounded-lg text-sm text-center transition-colors"
            >
              More Options
            </button>
          </div>
        </div>
      )}

      {/* Pending Payouts Section */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <ArrowDown className="text-yellow-300" />
          Pending Payouts
        </h4>
        {earningsData.expectedPayout > 0 || earningsData.lastPayout > 0 ? (
          <div className="space-y-3">
            {earningsData.expectedPayout > 0 && (
              <div className="flex flex-col sm:flex-row justify-between p-3 bg-black/10 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-12 bg-yellow-300/50 rounded-full"></div>
                  <div>
                    <p className="text-xs text-indigo-200">Expected Payout</p>
                    <p className="font-bold">₦{earningsData.expectedPayout.toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-2 sm:mt-0 sm:text-right">
                  <p className="text-xs text-indigo-200">Processing</p>
                  <p className="text-green-300 text-sm">March 23, 2025</p>
                </div>
              </div>
            )}
            {earningsData.lastPayout > 0 && (
              <div className="flex flex-col sm:flex-row justify-between p-3 bg-black/10 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-12 bg-green-300/50 rounded-full"></div>
                  <div>
                    <p className="text-xs text-indigo-200">Last Payout</p>
                    <p className="font-bold">₦{earningsData.lastPayout.toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-2 sm:mt-0 sm:text-right">
                  <p className="text-xs text-indigo-200">Completed</p>
                  <p className="text-green-300 text-sm">March 9, 2025</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-6 text-center bg-black/10 rounded-lg">
            <p className="text-indigo-200 text-sm">No pending or recent payouts to display</p>
          </div>
        )}
        {(earningsData.expectedPayout > 0 || earningsData.lastPayout > 0) && (
          <div className="mt-4 text-center">
            <button 
              onClick={() => navigate('/dashboard/earnings/payouts')}
              className="text-xs text-indigo-200 hover:text-white flex items-center gap-1 mx-auto"
            >
              View all payout history <ArrowRight className="text-xs" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorEarnings;
