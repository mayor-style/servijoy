import { useState, useEffect } from "react";

const RecentTransactions = () => {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setTransactions([
        {
          id: 1,
          user: "Jane Doe",
          service: "House Cleaning",
          amount: "$100",
          status: "Completed",
          date: "Feb 15, 2025",
        },
        {
          id: 2,
          user: "John Smith",
          service: "Plumbing",
          amount: "$80",
          status: "Pending",
          date: "Feb 14, 2025",
        },
        {
          id: 3,
          user: "Emily Johnson",
          service: "Electrical Repair",
          amount: "$120",
          status: "Completed",
          date: "Feb 13, 2025",
        },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="bg-soft-white dark:bg-gray-800 p-6 rounded-lg shadow-lg  transition mt-6">
      <h2 className="header text-gray-800 dark:text-white mb-4">
        Recent Transactions
      </h2>
      {loading ? (
        <div className="text-center py-10">
          <span className="loader">Loading Transactions...</span>
        </div>
      ) : (
        <div className="overflow-x-auto overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
          <table className="min-w-full bg-soft-white dark:bg-gray-800 rounded-lg overflow-hidden transition">
            <thead className="bg-light-gray dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              <tr>
                <th className="px-4 py-2 text-left">User</th>
                <th className="px-4 py-2 text-left">Service</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="hover:bg-light-gray dark:hover:bg-gray-700 transition"
                >
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{transaction.user}</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{transaction.service}</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-300">{transaction.amount}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        transaction.status === "Completed"
                          ? "bg-green text-soft-white"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-200"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-gray-800 dark:text-gray-300">
                    {transaction.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;
