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
              // More mock orders...
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

  // Apply filters (basic example: filter by customer name and status)
  const filteredOrders = orders.filter((order) => {
    let isValid = true;
    if (filters.customer && filters.customer.trim() !== "") {
      isValid =
        isValid &&
        order.customer.toLowerCase().includes(filters.customer.toLowerCase());
    }
    if (filters.status && filters.status !== "") {
      isValid = isValid && order.status.toLowerCase() === filters.status.toLowerCase();
    }
    // Add more filter conditions as needed...
    return isValid;
  });

  const toggleSelect = (id) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((orderId) => orderId !== id) : [...prev, id]
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-6">
        <span className="loading loading-spinner"></span>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-error">{error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>
              <input type="checkbox" className="checkbox" 
                onChange={(e) => {
                  if (e.target.checked) {
                    const currentIds = filteredOrders.map((order) => order.id);
                    setSelectedOrders(currentIds);
                  } else {
                    setSelectedOrders([]);
                  }
                }}
                checked={
                  filteredOrders.length > 0 &&
                  filteredOrders.every((order) => selectedOrders.includes(order.id))
                }
              />
            </th>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Order Date</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id} className="border-b dark:border-gray-700">
              <td>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={selectedOrders.includes(order.id)}
                  onChange={() => toggleSelect(order.id)}
                />
              </td>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.date}</td>
              <td>
                <span className={`badge ${getStatusClass(order.status)}`}>
                  {order.status}
                </span>
              </td>
              <td>{order.payment}</td>
              <td>{order.amount}</td>
              <td className="flex gap-2">
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => onOpenModal("details", order)}
                >
                  View
                </button>
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => onOpenModal("edit", order)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => onOpenModal("delete", order)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination controls can be added here if needed */}
    </div>
  );
};

export default OrdersTable;
