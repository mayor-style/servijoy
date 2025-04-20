import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, CreditCard, DollarSign, AlertCircle, Building, Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const WithdrawModal = ({ onConfirm, onCancel, balance }) => {
  const [amount, setAmount] = useState('');
  const [bankCode, setBankCode] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [error, setError] = useState('');
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingBanks, setFetchingBanks] = useState(true);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        setFetchingBanks(true);
        const response = await axios.get(`${API_URL}/api/payment/banks`, { withCredentials: true });
        if (response.data.status && Array.isArray(response.data.data)) {
          setBanks(response.data.data);
        } else {
          // Fallback to hardcoded banks if API fails
          setBanks([
            { code: '044', name: 'Access Bank' },
            { code: '063', name: 'Access Bank (Diamond)' },
            { code: '050', name: 'Ecobank Nigeria' },
            { code: '070', name: 'Fidelity Bank' },
            { code: '011', name: 'First Bank of Nigeria' },
            { code: '214', name: 'First City Monument Bank' },
            { code: '058', name: 'Guaranty Trust Bank' },
            { code: '030', name: 'Heritage Bank' },
            { code: '301', name: 'Jaiz Bank' },
            { code: '082', name: 'Keystone Bank' },
            { code: '101', name: 'Providus Bank' },
            { code: '076', name: 'Polaris Bank' },
            { code: '221', name: 'Stanbic IBTC Bank' },
            { code: '068', name: 'Standard Chartered Bank' },
            { code: '232', name: 'Sterling Bank' },
            { code: '100', name: 'Suntrust Bank' },
            { code: '032', name: 'Union Bank of Nigeria' },
            { code: '033', name: 'United Bank For Africa' },
            { code: '215', name: 'Unity Bank' },
            { code: '035', name: 'Wema Bank' },
            { code: '057', name: 'Zenith Bank' },
          ]);
        }
      } catch (error) {
        console.error('Error fetching banks:', error);
        // Use hardcoded banks as fallback
        setBanks([
          { code: '044', name: 'Access Bank' },
          { code: '063', name: 'Access Bank (Diamond)' },
          { code: '050', name: 'Ecobank Nigeria' },
          { code: '070', name: 'Fidelity Bank' },
          { code: '011', name: 'First Bank of Nigeria' },
          { code: '214', name: 'First City Monument Bank' },
          { code: '058', name: 'Guaranty Trust Bank' },
          { code: '030', name: 'Heritage Bank' },
          { code: '301', name: 'Jaiz Bank' },
          { code: '082', name: 'Keystone Bank' },
          { code: '101', name: 'Providus Bank' },
          { code: '076', name: 'Polaris Bank' },
          { code: '221', name: 'Stanbic IBTC Bank' },
          { code: '068', name: 'Standard Chartered Bank' },
          { code: '232', name: 'Sterling Bank' },
          { code: '100', name: 'Suntrust Bank' },
          { code: '032', name: 'Union Bank of Nigeria' },
          { code: '033', name: 'United Bank For Africa' },
          { code: '215', name: 'Unity Bank' },
          { code: '035', name: 'Wema Bank' },
          { code: '057', name: 'Zenith Bank' },
        ]);
      } finally {
        setFetchingBanks(false);
      }
    };

    fetchBanks();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const numAmount = parseFloat(amount);
    
    if (!numAmount || numAmount <= 0) {
      setError('Please enter a valid amount');
      setLoading(false);
      return;
    }
    
    if (numAmount > balance) {
      setError('Insufficient balance');
      setLoading(false);
      return;
    }
    
    if (!bankCode) {
      setError('Please select a bank');
      setLoading(false);
      return;
    }
    
    if (accountNumber.length !== 10 || !/^\d+$/.test(accountNumber)) {
      setError('Please enter a valid 10-digit account number');
      setLoading(false);
      return;
    }
    
    // Simulate delay to show loading state
    setTimeout(() => {
      onConfirm(numAmount, bankCode, accountNumber);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
              <DollarSign size={20} className="text-green-500 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Withdraw Funds</h3>
          </div>
          <button 
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
            disabled={loading}
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-2 px-4 py-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-6">
            <div className="flex-shrink-0">
              <CreditCard size={16} className="text-blue-500 dark:text-blue-400" />
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Available Balance: <span className="font-medium">₦{balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
            </p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Amount (₦)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400">₦</span>
                  </div>
                  <input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    className="w-full pl-8 pr-3 py-3 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-all" 
                    placeholder="Enter amount" 
                    required 
                    disabled={loading}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Bank
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building size={16} className="text-gray-500 dark:text-gray-400" />
                  </div>
                  <select 
                    value={bankCode} 
                    onChange={(e) => setBankCode(e.target.value)} 
                    className="w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-all appearance-none" 
                    required
                    disabled={fetchingBanks || loading}
                  >
                    <option value="">
                      {fetchingBanks ? 'Loading banks...' : 'Select a bank'}
                    </option>
                    {banks.map((bank) => (
                      <option key={bank.code} value={bank.code}>
                        {bank.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    {fetchingBanks ? (
                      <Loader2 size={16} className="text-gray-400 animate-spin" />
                    ) : (
                      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Account Number
                </label>
                <input 
                  type="text" 
                  value={accountNumber} 
                  onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, '').substring(0, 10))} 
                  className="w-full px-3 py-3 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-all" 
                  placeholder="Enter 10-digit account number" 
                  maxLength="10" 
                  required 
                  disabled={loading}
                />
              </div>
            </div>
            
            {error && (
              <div className="flex items-center gap-2 mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-sm text-red-700 dark:text-red-300">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}
            
            <div className="flex justify-end gap-3 mt-6">
              <button 
                type="button" 
                onClick={onCancel} 
                className="px-4 py-2 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing...</span>
                  </>
                ) : 'Withdraw Funds'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WithdrawModal;