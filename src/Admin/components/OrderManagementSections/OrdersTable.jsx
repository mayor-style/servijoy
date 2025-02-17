import React, { useEffect, useState } from "react";

const getStatusClass = (status) => {
  switch (status) {
    case "Pending":
      return "badge-warning";
    case "Processing":
      return "badge-info";
    case "Shipped":
      return "badge-primary";
    case "Delivered":
      return "badge-success";
    case "Canceled":
      return "badge-error";
    default:
      return "";
  }
};

const OrdersTable = ({ filters, selectedOrders, setSelectedOrders, onOpenModal }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Simulate fetching orders from an API with dummy data
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              {
                id: "ORD1234",
                customer: "Jane Doe",
                date: "2025-02-17",
                status: "Pending",
                payment: "Unpaid",
                amount: "$250.00",
              },
              {
                id: "ORD1235",
                customer: "John Smith",
                date: "2025-02-16",
                status: "Delivered",
                payment: "Paid",
                amount: "$350.00",
              },
              {
                id: "ORD1236",
                customer: "Alice Johnson",
                date: "2025-02-15",
                status: "Processing",
                payment: "Partially Paid",
                amount: "$180.00",
              },
              // Additional mock orders...
            ]);
          }, 1000);
        });
        setOrders(response);
      } catch (err) {
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Apply basic filters (e.g., by customer and status)
  const filteredOrders = orders.filter((order) => {
    let valid = true;
    if (filters.customer && filters.customer.trim() !== "") {
      valid = valid && order.customer.toLowerCase().includes(filters.customer.toLowerCase());
    }
    if (filters.status && filters.status !== "") {
      valid = valid && order.status.toLowerCase() === filters.status.toLowerCase();
    }
    return valid;
  });

  const toggleSelect = (id) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((orderId) => orderId !== id) : [...prev, id]
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-6">
        {/* A spinner or skeleton loader */}
        <span className="loading loading-spinner"></span>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-error p-4 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 bg-soft-white dark:bg-gray-800 rounded-lg shadow-md mt-4 transition">
      <table className="table w-full min-w-[800px]">
        <thead>
          <tr className="bg-light-gray dark:bg-gray-700 text-left text-gray-800 dark:text-gray-200">
            <th className="p-3">
              <input
                type="checkbox"
                className="checkbox dark:border-gray-500"
                onChange={(e) =>
                  setSelectedOrders(
                    e.target.checked
                      ? filteredOrders.map((order) => order.id)
                      : []
                  )
                }
                checked={
                  filteredOrders.length > 0 &&
                  filteredOrders.every((order) => selectedOrders.includes(order.id))
                }
              />
            </th>
            <th className="p-3">Order ID</th>
            <th className="p-3">Customer</th>
            <th className="p-3">Order Date</th>
            <th className="p-3">Status</th>
            <th className="p-3">Payment</th>
            <th className="p-3">Total</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id} className="border-b dark:border-gray-700">
              <td className="p-3">
                <input
                  type="checkbox"
                  className="checkbox  dark:border-gray-500"
                  checked={selectedOrders.includes(order.id)}
                  onChange={() => toggleSelect(order.id)}
                />
              </td>
              <td className="p-3 text-gray-800 dark:text-gray-200">{order.id}</td>
              <td className="p-3 text-gray-800 dark:text-gray-200">{order.customer}</td>
              <td className="p-3 text-gray-800 dark:text-gray-200">{order.date}</td>
              <td className="p-3">
                <span className={`badge ${getStatusClass(order.status)}`}>
                  {order.status}
                </span>
              </td>
              <td className="p-3 text-gray-800 dark:text-gray-200">{order.payment}</td>
              <td className="p-3 text-gray-800 dark:text-gray-200">{order.amount}</td>
              <td className="p-3 flex gap-2">
                <button
                  className="btn btn-sm btn-info transition"
                  onClick={() => onOpenModal("details", order)}
                >
                  View
                </button>
                <button
                  className="btn btn-sm btn-warning transition"
                  onClick={() => onOpenModal("edit", order)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-error transition"
                  onClick={() => onOpenModal("delete", order)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
