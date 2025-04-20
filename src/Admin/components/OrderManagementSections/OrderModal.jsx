import React, { useState, useEffect } from "react";
import { 
  OrderDetailsModal, 
  EditOrderModal, 
  DeleteConfirmationModal, 
  SuccessModal 
} from "./OrderModalsComponnts";

/**
 * OrderModalController - A unified controller for all order-related modals
 * 
 * @param {Object} props
 * @param {string} props.type - The type of modal to display ('details', 'edit', 'delete')
 * @param {Object} props.order - The order data object
 * @param {Function} props.onClose - Function to call when the modal is closed
 * @param {Function} props.onSave - Function to call when an edit is saved
 * @param {Function} props.onDelete - Function to call when a delete is confirmed
 * @param {boolean} props.showSuccessMessage - Whether to show success messages after actions
 * @param {Function} props.onActionComplete - Callback for when any action completes
 * @returns {React.ReactElement}
 */
const OrderModalController = ({ 
  type, 
  order, 
  onClose, 
  onSave, 
  onDelete, 
  showSuccessMessage = true,
  onActionComplete
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  
  // Open modal when type changes
  useEffect(() => {
    if (type && order) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [type, order]);

  // Handle modal close with a unified method
  const handleClose = () => {
    setIsOpen(false);
    // Small delay to allow animation to complete
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };

  // Handle successful save action
  const handleSave = (updatedData) => {
    if (onSave) {
      // Merge the updated data with the order ID to ensure it's properly identified
      const completeData = { id: order.id, ...updatedData };
      onSave(completeData);
      
      if (showSuccessMessage) {
        setSuccessMessage(`Order #${order.id} has been successfully updated!`);
        setSuccessOpen(true);
      }
      
      if (onActionComplete) onActionComplete('edit', order.id, completeData);
    }
    handleClose();
  };

  // Handle successful delete action
  const handleDelete = (orderId) => {
    if (onDelete) {
      onDelete(orderId);
      
      if (showSuccessMessage) {
        setSuccessMessage(`Order #${orderId} has been successfully deleted!`);
        setSuccessOpen(true);
      }
      
      if (onActionComplete) onActionComplete('delete', orderId);
    }
    handleClose();
  };

  // Close success message
  const handleSuccessClose = () => {
    setSuccessOpen(false);
  };

  // Ensure order data is available
  if (!order) return null;

  // Render the appropriate modal based on type
  const renderModal = () => {
    switch (type) {
      case "details":
        return (
          <OrderDetailsModal 
            order={order} 
            isOpen={isOpen} 
            onClose={handleClose} 
          />
        );
      case "edit":
        return (
          <EditOrderModal 
            order={order} 
            isOpen={isOpen} 
            onSave={handleSave} 
            onClose={handleClose} 
          />
        );
      case "delete":
        return (
          <DeleteConfirmationModal 
            orderId={order.id} 
            isOpen={isOpen} 
            onConfirm={handleDelete} 
            onClose={handleClose} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {renderModal()}
      
      {/* Success notification modal */}
      {showSuccessMessage && (
        <SuccessModal 
          message={successMessage} 
          isOpen={successOpen} 
          onClose={handleSuccessClose} 
        />
      )}
    </>
  );
};

/**
 * Hook to manage order modal state
 * 
 * @returns {Array} [modalState, modalControls]
 */
export const useOrderModal = () => {
  const [modalState, setModalState] = useState({
    type: null,
    order: null,
    isOpen: false
  });

  // Open a specific modal type with order data
  const openModal = (type, order) => {
    setModalState({
      type,
      order,
      isOpen: true
    });
  };

  // Close the modal
  const closeModal = () => {
    setModalState(prev => ({
      ...prev,
      type: null,
      order: null,
      isOpen: false
    }));
  };

  // Convenience methods for opening specific modal types
  const modalControls = {
    openModal,
    closeModal,
    openDetails: (order) => openModal('details', order),
    openEdit: (order) => openModal('edit', order),
    openDelete: (order) => openModal('delete', order)
  };

  return [modalState, modalControls];
};

/**
 * Example usage component
 */
export const OrderModalExample = () => {
  const [modalState, modalControls] = useOrderModal();
  const [orders, setOrders] = useState([
    {
      id: "ORD-12345",
      status: "Processing",
      date: "2025-03-15T12:00:00Z",
      customer: {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567"
      },
      items: [
        { name: "Product A", quantity: 2, price: 29.99 },
        { name: "Product B", quantity: 1, price: 49.99 }
      ],
      payment: {
        status: "Paid",
        amount: 109.97,
        method: "Credit Card"
      },
      history: [
        "Order placed - Mar 15, 2025",
        "Payment confirmed - Mar 15, 2025",
        "Processing started - Mar 16, 2025"
      ],
      trackingNumber: "",
      notes: ""
    }
  ]);

  // Handle saving edited order
  const handleSave = (updatedOrder) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === updatedOrder.id ? { ...order, ...updatedOrder } : order
      )
    );
  };

  // Handle deleting order
  const handleDelete = (orderId) => {
    setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
  };

  return (
    <div className="p-6">
      <div className="flex space-x-3 mb-4">
        <button 
          onClick={() => modalControls.openDetails(orders[0])} 
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          View Order Details
        </button>
        <button 
          onClick={() => modalControls.openEdit(orders[0])} 
          className="px-4 py-2 bg-green-600 text-white rounded-md"
        >
          Edit Order
        </button>
        <button 
          onClick={() => modalControls.openDelete(orders[0])} 
          className="px-4 py-2 bg-red-600 text-white rounded-md"
        >
          Delete Order
        </button>
      </div>

      {/* Modal controller component */}
      <OrderModalController
        type={modalState.type}
        order={modalState.order}
        onClose={modalControls.closeModal}
        onSave={handleSave}
        onDelete={handleDelete}
        showSuccessMessage={true}
        onActionComplete={(action, id, data) => {
          console.log(`Action ${action} completed for order ${id}`, data);
        }}
      />
    </div>
  );
};

export default OrderModalController;