import React, { useState } from "react";

const OrderDetailsModal = ({ order, onClose }) => (
  <dialog open className="modal transition">
    <div className="modal-box text-theme bg-soft-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
      <h3 className="text-lg font-bold mb-2">Order Details: {order.id}</h3>
      <p className="mb-2">
        <strong>Customer:</strong> {order.customer.name} ({order.customer.email})
      </p>
      <p className="mb-2">
        <strong>Items:</strong>{" "}
        {order.items.map((item) => `${item.name} x${item.quantity}`).join(", ")}
      </p>
      <p className="mb-2">
        <strong>Payment:</strong> {order.payment.status} - ${order.payment.amount}
      </p>
      <p className="mb-2">
        <strong>Status History:</strong> {order.history.join(", ")}
      </p>
      <button className="btn btn-primary mt-4" onClick={onClose}>
        Close
      </button>
    </div>
  </dialog>
);

const EditOrderModal = ({ order, onSave, onClose }) => {
  const [status, setStatus] = useState(order.status);
  const [payment, setPayment] = useState(order.payment.status);

  const handleSave = () => {
    onSave({ status, payment });
    onClose();
  };

  return (
    <dialog open className="modal transition">
      <div className="modal-box text-theme bg-soft-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
        <h3 className="text-lg font-bold mb-4">Edit Order: {order.id}</h3>
        <label className="mb-2 block text-gray-700 dark:text-gray-300">Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="select select-bordered w-full mb-4 dark:bg-gray-700"
        >
          <option>Pending</option>
          <option>Processing</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Canceled</option>
        </select>
        <label className="mb-2 block text-gray-700 dark:text-gray-300">Payment Status:</label>
        <select
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
          className="select select-bordered w-full mb-4 dark:bg-gray-700"
        >
          <option>Paid</option>
          <option>Unpaid</option>
          <option>Partially Paid</option>
          <option>Refunded</option>
        </select>
        <div className="flex gap-4">
          <button className="btn btn-success" onClick={handleSave}>
            Save Changes
          </button>
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

const DeleteConfirmationModal = ({ orderId, onConfirm, onClose }) => (
  <dialog open className="modal transition">
    <div className="modal-box text-theme bg-soft-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
      <h3 className="font-bold text-lg mb-2">Confirm Delete</h3>
      <p className="mb-4">Are you sure you want to delete order #{orderId}?</p>
      <div className="modal-action flex gap-4">
        <button className="btn btn-error" onClick={() => { onConfirm(orderId); onClose(); }}>
          Yes, Delete
        </button>
        <button className="btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  </dialog>
);

export { OrderDetailsModal, EditOrderModal, DeleteConfirmationModal };
