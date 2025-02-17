import React from "react";
import { DeleteConfirmationModal, EditOrderModal, OrderDetailsModal } from "./OrderModalsComponnts";


const OrderModal = ({ type, order, onClose, onSave, onConfirm }) => {
  if (!order) return null; // Ensure order data is available

  switch (type) {
    case "details":
      return <OrderDetailsModal order={order} onClose={onClose} />;
    case "edit":
      return <EditOrderModal order={order} onSave={onSave} onClose={onClose} />;
    case "delete":
      return <DeleteConfirmationModal orderId={order.id} onConfirm={onConfirm} onClose={onClose} />;
    default:
      return null;
  }
};

export default OrderModal;
