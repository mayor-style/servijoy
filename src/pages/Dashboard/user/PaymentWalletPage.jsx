import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWallet, FaHistory, FaCreditCard, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';

import WalletBalance from './components/PaymentWalletSections/WalletBalance';
import PaymentMethods from './components/PaymentWalletSections/PaymentMethods';
import TransactionHistory from './components/PaymentWalletSections/TransactionHistory';
import TopUpModal from './components/PaymentWalletSections/TopUpModal';
import WithdrawModal from './components/PaymentWalletSections/WithdrawModal';
import AddPaymentMethodModal from './components/PaymentWalletSections/AddPaymentMethodModal';
import EditPaymentMethodModal from './components/PaymentWalletSections/EditPaymentMethodModal';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const PaymentWallet = () => {
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);
  const [methods, setMethods] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isAddPaymentMethodModalOpen, setIsAddPaymentMethodModalOpen] = useState(false);
  const [isEditPaymentMethodModalOpen, setIsEditPaymentMethodModalOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('wallet');

  const fetchData = async (showRefresh = false) => {
    if (showRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError('');
    
    try {
      const [balanceRes, methodsRes, transactionsRes] = await Promise.all([
        axios.get(`${API_URL}/api/payment/wallet-balance`, { withCredentials: true }),
        axios.get(`${API_URL}/api/payment-methods`, { withCredentials: true }),
        axios.get(`${API_URL}/api/payment/transactions`, { withCredentials: true }),
      ]);
      
      setBalance(balanceRes.data.data.balance);
      setMethods(methodsRes.data.data);
      setTransactions(transactionsRes.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load wallet data. Please try again later.');
    } finally {
      setLoading(false);
      if (showRefresh) {
        setTimeout(() => setRefreshing(false), 600);
      }
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
      
      // Setup refresh interval
      const interval = setInterval(() => {
        fetchData(true);
      }, 60000); // Refresh every minute
      
      return () => clearInterval(interval);
    }
  }, [user]);

  const handleTopUp = async (amount) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/payment/initialize`,
        { amount },
        { withCredentials: true }
      );
      
      if (response.data.status && response.data.data.authorization_url) {
        window.location.href = response.data.data.authorization_url;
      } else {
        throw new Error('Invalid payment response');
      }
    } catch (error) {
      console.error('Error initializing payment:', error);
      alert(error.response?.data?.message || 'Failed to process payment.');
    }
    setIsTopUpModalOpen(false);
  };

  const handleWithdraw = async (amount, bankCode, accountNumber) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/payment/withdraw`,
        { amount, bankCode, accountNumber },
        { withCredentials: true }
      );
      
      if (response.data.status) {
        alert('Withdrawal request submitted successfully.');
        fetchData();
      } else {
        throw new Error(response.data.message || 'Failed to withdraw funds');
      }
    } catch (error) {
      console.error('Error withdrawing funds:', error);
      alert(error.response?.data?.message || 'Failed to withdraw funds.');
    }
    setIsWithdrawModalOpen(false);
  };

  const handleAddPaymentMethod = async (reference) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/payment-methods`,
        { reference },
        { withCredentials: true }
      );
      
      if (response.data.status) {
        fetchData();
      } else {
        throw new Error(response.data.message || 'Failed to add payment method');
      }
    } catch (error) {
      console.error('Error adding payment method:', error);
      alert(error.response?.data?.message || 'Failed to add payment method.');
    }
    setIsAddPaymentMethodModalOpen(false);
  };

  const handleUpdatePaymentMethod = async (methodId, updates) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/payment-methods/${methodId}`,
        updates,
        { withCredentials: true }
      );
      
      if (response.data.status) {
        fetchData();
      } else {
        throw new Error(response.data.message || 'Failed to update payment method');
      }
    } catch (error) {
      console.error('Error updating payment method:', error);
      alert(error.response?.data?.message || 'Failed to update payment method.');
    }
    setIsEditPaymentMethodModalOpen(false);
  };

  const refreshData = () => {
    fetchData(true);
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 w-full h-96 flex justify-center items-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">Loading your wallet data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 w-full">
        <div className="text-center py-10">
          <div className="bg-red-100 dark:bg-red-900/30 p-6 rounded-lg mb-4 max-w-lg mx-auto">
            <FaExclamationTriangle className="text-red-500 text-4xl mx-auto mb-4" />
            <p className="font-medium text-red-700 dark:text-red-400 mb-2">Error loading wallet data</p>
            <p className="text-red-600 dark:text-red-300">{error}</p>
          </div>
          <button 
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition transform hover:scale-105 shadow-md"
            onClick={fetchData}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 w-full h-96 flex justify-center items-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">Loading user information...</p>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 w-full"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8">
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-4 md:mb-0">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg">
            <FaWallet className="text-white text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Wallet & Payments</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Manage your funds and payment methods</p>
          </div>
        </motion.div>
        
        <motion.button
          variants={itemVariants}
          whileTap={{ scale: 0.95 }}
          onClick={refreshData}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-all self-start md:self-center"
        >
          <FaHistory className={`${refreshing ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </motion.button>
      </div>
      
      <motion.div 
        variants={itemVariants}
        className="mb-6 border-b border-gray-200 dark:border-gray-700"
      >
        <div className="flex space-x-2 md:space-x-4 overflow-x-auto hide-scrollbar">
          <button
            onClick={() => setActiveTab('wallet')}
            className={`pb-2 px-4 font-medium text-sm whitespace-nowrap border-b-2 transition-all ${
              activeTab === 'wallet'
                ? 'border-blue-500 text-blue-500 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'
            }`}
          >
            <div className="flex items-center gap-2">
              <FaWallet className="text-sm" />
              <span>Wallet Balance</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('methods')}
            className={`pb-2 px-4 font-medium text-sm whitespace-nowrap border-b-2 transition-all ${
              activeTab === 'methods'
                ? 'border-blue-500 text-blue-500 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'
            }`}
          >
            <div className="flex items-center gap-2">
              <FaCreditCard className="text-sm" />
              <span>Payment Methods</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`pb-2 px-4 font-medium text-sm whitespace-nowrap border-b-2 transition-all ${
              activeTab === 'history'
                ? 'border-blue-500 text-blue-500 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'
            }`}
          >
            <div className="flex items-center gap-2">
              <FaHistory className="text-sm" />
              <span>Transaction History</span>
            </div>
          </button>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {activeTab === 'wallet' && (
            <WalletBalance 
              balance={balance} 
              onTopUp={() => setIsTopUpModalOpen(true)} 
              onWithdraw={() => setIsWithdrawModalOpen(true)} 
            />
          )}
          
          {activeTab === 'methods' && (
            <PaymentMethods 
              methods={methods} 
              onAddMethod={() => setIsAddPaymentMethodModalOpen(true)} 
              onEditMethod={(method) => { 
                setSelectedMethod(method); 
                setIsEditPaymentMethodModalOpen(true); 
              }} 
            />
          )}
          
          {activeTab === 'history' && (
            <TransactionHistory transactions={transactions} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Show all sections on larger screens */}
      <div className="hidden lg:block lg:space-y-8 mt-6">
        {activeTab !== 'wallet' && (
          <motion.div variants={itemVariants}>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Wallet Balance</h2>
            <WalletBalance 
              balance={balance} 
              onTopUp={() => setIsTopUpModalOpen(true)} 
              onWithdraw={() => setIsWithdrawModalOpen(true)} 
              isCompact={true}
            />
          </motion.div>
        )}
        
        {activeTab !== 'methods' && (
          <motion.div variants={itemVariants}>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Payment Methods</h2>
            <PaymentMethods 
              methods={methods} 
              onAddMethod={() => setIsAddPaymentMethodModalOpen(true)} 
              onEditMethod={(method) => { 
                setSelectedMethod(method); 
                setIsEditPaymentMethodModalOpen(true); 
              }}
              isCompact={true}
            />
          </motion.div>
        )}
        
        {activeTab !== 'history' && (
          <motion.div variants={itemVariants}>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Transaction History</h2>
            <TransactionHistory transactions={transactions} isCompact={true} />
          </motion.div>
        )}
      </div>

      {/* Modals */}
      {isTopUpModalOpen && (
        <TopUpModal 
          onConfirm={handleTopUp} 
          onCancel={() => setIsTopUpModalOpen(false)} 
        />
      )}
      
      {isWithdrawModalOpen && (
        <WithdrawModal 
          onConfirm={handleWithdraw} 
          onCancel={() => setIsWithdrawModalOpen(false)} 
          balance={balance} 
        />
      )}
      
      {isAddPaymentMethodModalOpen && (
        <AddPaymentMethodModal 
          onConfirm={handleAddPaymentMethod} 
          onCancel={() => setIsAddPaymentMethodModalOpen(false)} 
          userEmail={user.email}
        />
      )}
      
      {isEditPaymentMethodModalOpen && (
        <EditPaymentMethodModal 
          method={selectedMethod} 
          onConfirm={(updates) => handleUpdatePaymentMethod(selectedMethod._id, updates)} 
          onCancel={() => setIsEditPaymentMethodModalOpen(false)} 
        />
      )}
    </motion.div>
  );
};

export default PaymentWallet;