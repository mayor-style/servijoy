import React from "react";
import { OrderDetailsModal, EditOrderModal, DeleteConfirmationModal } from "./OrderModalsComponnts";

// The OrderModal component acts as a wrapper that selects which modal to render based on the "type" prop.
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
