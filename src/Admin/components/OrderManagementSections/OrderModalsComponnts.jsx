import { useState } from 'react';

const OrderDetailsModal = ({ order, onClose }) => (
  <dialog open className="modal">
    <div className="modal-box">
      <h3 className="text-lg font-bold">Order Details: {order.id}</h3>
      <p><strong>Customer:</strong> {order.customer.name} ({order.customer.email})</p>
      <p><strong>Items:</strong> {order.items.map(item => `${item.name} x${item.quantity}`).join(', ')}</p>
      <p><strong>Payment:</strong> {order.payment.status} - ${order.payment.amount}</p>
      <p><strong>Status History:</strong> {order.history.join(', ')}</p>
      <button className="btn btn-primary mt-4" onClick={onClose}>Close</button>
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
    <dialog open className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-bold">Edit Order: {order.id}</h3>
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="select select-bordered w-full mb-2">
          <option>Pending</option><option>Processing</option><option>Shipped</option><option>Delivered</option><option>Canceled</option>
        </select>
        <label>Payment Status:</label>
        <select value={payment} onChange={(e) => setPayment(e.target.value)} className="select select-bordered w-full mb-4">
          <option>Paid</option><option>Unpaid</option><option>Partially Paid</option><option>Refunded</option>
        </select>
        <button className="btn btn-success mr-2" onClick={handleSave}>Save Changes</button>
        <button className="btn" onClick={onClose}>Cancel</button>
      </div>
    </dialog>
  );
};

const DeleteConfirmationModal = ({ orderId, onConfirm, onClose }) => (
  <dialog open className="modal">
    <div className="modal-box">
      <h3 className="font-bold text-lg">Confirm Delete</h3>
      <p>Are you sure you want to delete order #{orderId}?</p>
      <div className="modal-action">
        <button className="btn btn-error" onClick={() => { onConfirm(orderId); onClose(); }}>Yes, Delete</button>
        <button className="btn" onClick={onClose}>Cancel</button>
      </div>
    </div>
  </dialog>
);

export { OrderDetailsModal, EditOrderModal, DeleteConfirmationModal };
