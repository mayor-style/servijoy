import React, { useState } from "react";
import EarningsSummary from "./components/EarningsAndPayoutsSections/EarningsSummary";
import PayoutHistory from "./components/EarningsAndPayoutsSections/PayoutHistory";
import RequestPayoutModal from "./components/EarningsAndPayoutsSections/RequestPayoutModal";

const EarningsAndPayouts = () => {
  // MOCK DATA
  const [totalEarnings] = useState(5230.5);
  const [pendingPayouts, setPendingPayouts] = useState(1280.75);
  const [payoutHistory, setPayoutHistory] = useState([
    {
      id: 1,
      date: "2025-02-01",
      amount: 500.0,
      status: "completed",
      paymentMethod: "Bank Transfer",
    },
    {
      id: 2,
      date: "2025-01-15",
      amount: 300.0,
      status: "completed",
      paymentMethod: "PayPal",
    },
    {
      id: 3,
      date: "2025-01-05",
      amount: 250.0,
      status: "pending",
      paymentMethod: "Bank Transfer",
    },
  ]);

  // Modal state
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);

  // Handler when a new payout request is submitted
  const handlePayoutRequest = (request) => {
    setPayoutHistory([request, ...payoutHistory]);
    setPendingPayouts(pendingPayouts - request.amount);
  };

  return (
    <div className="min-h-screen dark:bg-gray-900 py-10 px-0 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Earnings Summary Section */}
        <EarningsSummary totalEarnings={totalEarnings} pendingPayouts={pendingPayouts} />

        {/* Request Payout Button */}
        <div className="flex justify-center md:justify-end">
          <button
            onClick={() => setIsPayoutModalOpen(true)}
            className="px-6 py-3 bg-green hover:brightness-110 text-white rounded-lg transition-colors duration-200 shadow-lg w-full md:w-auto"
          >
            Request Payout
          </button>
        </div>

        {/* Payout History Section */}
        <div className="overflow-x-auto">
          <PayoutHistory payouts={payoutHistory} />
        </div>
      </div>

      {/* Request Payout Modal */}
      <RequestPayoutModal
        isOpen={isPayoutModalOpen}
        onClose={() => setIsPayoutModalOpen(false)}
        onSubmit={handlePayoutRequest}
        availableAmount={pendingPayouts}
      />
    </div>
  );
};

export default EarningsAndPayouts;
