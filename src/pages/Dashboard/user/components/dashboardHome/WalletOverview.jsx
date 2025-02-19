// WalletOverview Component
import { Link } from "react-router-dom";
import { FaWallet, FaPlusCircle, FaMinusCircle } from "react-icons/fa";

const WalletOverview = () => {
  const walletBalance = 12500;
  const recentTransactions = [
    { type: "Deposit", amount: 5000, date: "Feb 10, 2025" },
    { type: "Service Payment", amount: -3000, date: "Feb 8, 2025" },
    { type: "Deposit", amount: 10000, date: "Feb 5, 2025" },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-2xl shadow-xl transform transition duration-300 hover:shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-lg sm:max-w-xl">
      <div className="flex items-center gap-4">
        <div className="p-3 gradient rounded-full shadow-lg">
          <FaWallet className="text-white text-2xl md:text-3xl" />
        </div>
        <div>
          <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white font-header">Wallet Overview</h3>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-300">Manage your funds securely.</p>
        </div>
      </div>
      
      <div className="mt-6 md:mt-8 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">₦{walletBalance.toLocaleString()}</h2>
        <p className="mt-2 text-xs md:text-sm text-gray-500 dark:text-gray-400">Available Balance</p>
      </div>
      
      <div className="mt-6 md:mt-8 flex justify-center gap-6 md:gap-8">
        <Link to="/dashboard/wallet/deposit" className="flex items-center gap-2 px-3 md:px-4 py-2 btn-green hover:bg-green-600 text-white rounded-lg shadow transition">
          <FaPlusCircle className="text-lg md:text-xl" /> Deposit
        </Link>
        <Link to="/dashboard/wallet/withdraw" className="flex items-center gap-2 px-3 md:px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow transition">
          <FaMinusCircle className="text-lg md:text-xl" /> Withdraw
        </Link>
      </div>
      
      <div className="mt-6 md:mt-8">
        <h4 className="text-md md:text-lg font-semibold text-gray-800 dark:text-white">Recent Transactions</h4>
        <ul className="mt-3 md:mt-4 space-y-2 md:space-y-3">
          {recentTransactions.map((tx, index) => (
            <li key={index} className="flex justify-between items-center p-2 md:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
              <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300">{tx.date}</span>
              <span className={`text-xs md:text-sm font-bold ${tx.amount > 0 ? "text-gray-300" : "text-red-500"}`}>
                {tx.amount > 0 ? "+" : "-"}₦{Math.abs(tx.amount).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WalletOverview;
