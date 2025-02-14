import React, { useState } from 'react';
import WalletBalance from './components/PaymentWalletSections/WalletBalance';
import PaymentMethods from './components/PaymentWalletSections/PaymentMethods';
import TransactionHistory from './components/PaymentWalletSections/TransactionHistory';

const PaymentWallet = () => {
  // MOCK DATA for wallet balance
  const mockBalance = 250.75;

  // MOCK DATA for payment methods
  const mockPaymentMethods = [
    {
      id: 1,
      type: 'credit',
      brand: 'Visa',
      last4: '1234',
      expiry: '12/24',
    },
    {
      id: 2,
      type: 'bank',
      brand: 'Chase Bank',
      last4: '5678',
      expiry: 'N/A',
    },
  ];

  // MOCK DATA for transactions
  const mockTransactions = [
    {
      id: 1,
      date: '2025-02-01',
      description: 'Top Up Wallet',
      amount: 100.0,
      type: 'credit',
      status: 'completed',
    },
    {
      id: 2,
      date: '2025-02-05',
      description: 'Payment for Service',
      amount: 75.5,
      type: 'debit',
      status: 'completed',
    },
    {
      id: 3,
      date: '2025-02-10',
      description: 'Withdrawal',
      amount: 50.0,
      type: 'debit',
      status: 'pending',
    },
  ];

  // Handlers for user actions
  const handleTopUp = () => console.log('Top Up Wallet clicked');
  const handleWithdraw = () => console.log('Withdraw clicked');
  const handleAddPaymentMethod = () => console.log('Add Payment Method clicked');
  const handleEditPaymentMethod = (methodId) => console.log('Edit Payment Method:', methodId);

  return (
    <div className="min-h-screen dark:bg-gray-900 py-10 px-0">
      <div className="max-w-7xl mx-auto space-y-8">
        <WalletBalance balance={mockBalance} onTopUp={handleTopUp} onWithdraw={handleWithdraw} />
        <PaymentMethods methods={mockPaymentMethods} onAddMethod={handleAddPaymentMethod} onEditMethod={handleEditPaymentMethod} />
        <TransactionHistory transactions={mockTransactions} />
      </div>
    </div>
  );
};

export default PaymentWallet;
