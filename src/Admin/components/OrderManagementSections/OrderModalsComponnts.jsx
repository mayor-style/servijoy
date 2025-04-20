import React, { useState, useRef, useEffect } from "react";
import { X, Save, AlertTriangle, Check, Clipboard, ChevronDown, Calendar, CreditCard, Package, Truck, User } from "lucide-react";

// Custom Button component with different variants
const Button = ({ 
  children, 
  variant = "default", 
  size = "md", 
  icon,
  onClick, 
  className = "",
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantStyles = {
    default: "bg-gray-100 hover:bg-gray-200 focus:ring-gray-500 text-gray-700",
    primary: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white",
    success: "bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500 text-white",
    danger: "bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-500"
  };
  
  const sizeStyles = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-2",
    lg: "text-base px-4 py-2"
  };
  
  return (
    <button 
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      {children}
    </button>
  );
};

// Custom Input component
const Select = ({ 
  label, 
  value, 
  options, 
  onChange, 
  className = "", 
  id,
  ...props 
}) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className={`relative ${className}`}>
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          value={value}
          onChange={onChange}
          className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

// Badge component
const Badge = ({ children, variant = "default", className = "" }) => {
  const variantStyles = {
    default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
    success: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
    danger: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};

// Modal backdrop and container
const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300">
      <div 
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-auto overflow-hidden transform transition-all duration-300 ease-out"
      >
        {children}
      </div>
    </div>
  );
};

// OrderDetailsModal with improved styling and details
const OrderDetailsModal = ({ order, isOpen, onClose }) => {
  // Get payment status style
  const getPaymentStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'paid': return 'success';
      case 'partially paid': return 'warning';
      case 'unpaid': return 'danger';
      case 'refunded': return 'info';
      default: return 'default';
    }
  };

  // Get order status style
  const getOrderStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'success';
      case 'shipped': return 'info';
      case 'processing': return 'warning';
      case 'cancelled':
      case 'canceled': return 'danger';
      default: return 'default';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Order #{order.id}</h3>
        <Button variant="ghost" size="sm" icon={<X />} onClick={onClose} className="rounded-full" aria-label="Close" />
      </div>
      
      <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
        {/* Order Status */}
        <div className="flex justify-between items-center">
          <Badge variant={getOrderStatusStyle(order.status)}>{order.status}</Badge>
          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(order.date || Date.now()).toLocaleDateString()}
          </span>
        </div>
        
        {/* Customer Information */}
        <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <h4 className="font-medium">Customer Details</h4>
          </div>
          <div className="pl-6 text-sm">
            <p><span className="text-gray-500 dark:text-gray-400">Name:</span> {order.customer.name}</p>
            <p><span className="text-gray-500 dark:text-gray-400">Email:</span> {order.customer.email}</p>
            {order.customer.phone && <p><span className="text-gray-500 dark:text-gray-400">Phone:</span> {order.customer.phone}</p>}
          </div>
        </div>
        
        {/* Payment Information */}
        <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <h4 className="font-medium">Payment Information</h4>
          </div>
          <div className="pl-6 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Status:</span>
              <Badge variant={getPaymentStatusStyle(order.payment.status)}>{order.payment.status}</Badge>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-gray-500 dark:text-gray-400">Amount:</span>
              <span className="font-medium">${order.payment.amount.toFixed(2)}</span>
            </div>
            {order.payment.method && (
              <div className="flex justify-between mt-1">
                <span className="text-gray-500 dark:text-gray-400">Method:</span>
                <span>{order.payment.method}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Order Items */}
        <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <h4 className="font-medium">Items</h4>
          </div>
          <div className="pl-2">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 dark:text-gray-400 border-b dark:border-gray-600">
                  <th className="text-left py-2 font-medium">Item</th>
                  <th className="text-center py-2 font-medium">Qty</th>
                  <th className="text-right py-2 font-medium">Price</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={index} className="border-b dark:border-gray-600 last:border-0">
                    <td className="py-2">{item.name}</td>
                    <td className="text-center py-2">{item.quantity}</td>
                    <td className="text-right py-2">${(item.price || 0).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Status History */}
        {order.history && order.history.length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Truck className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <h4 className="font-medium">Status History</h4>
            </div>
            <div className="pl-6">
              <ul className="space-y-2">
                {order.history.map((status, index) => (
                  <li key={index} className="text-sm flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    {status}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t dark:border-gray-700 flex justify-end">
        <Button variant="ghost" onClick={onClose} className="mr-2">Close</Button>
        <Button 
          variant="primary" 
          icon={<Clipboard />}
          onClick={() => {
            // Copy order details to clipboard functionality
            // This is a placeholder for the actual implementation
            alert('Order details copied to clipboard');
          }}
        >
          Copy Details
        </Button>
      </div>
    </Modal>
  );
};

// EditOrderModal with improved form styling
const EditOrderModal = ({ order, isOpen, onSave, onClose }) => {
  const [status, setStatus] = useState(order.status);
  const [payment, setPayment] = useState(order.payment.status);
  const [notes, setNotes] = useState(order.notes || '');
  const [trackingNumber, setTrackingNumber] = useState(order.trackingNumber || '');

  const handleSave = () => {
    onSave({ 
      status, 
      payment, 
      notes, 
      trackingNumber,
      lastUpdated: new Date().toISOString()
    });
    onClose();
  };

  const statusOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Processing', label: 'Processing' },
    { value: 'Shipped', label: 'Shipped' },
    { value: 'Delivered', label: 'Delivered' },
    { value: 'Canceled', label: 'Canceled' }
  ];

  const paymentOptions = [
    { value: 'Paid', label: 'Paid' },
    { value: 'Unpaid', label: 'Unpaid' },
    { value: 'Partially Paid', label: 'Partially Paid' },
    { value: 'Refunded', label: 'Refunded' }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Order #{order.id}</h3>
        <Button variant="ghost" size="sm" icon={<X />} onClick={onClose} className="rounded-full" aria-label="Close" />
      </div>
      
      <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Order Status"
            value={status}
            options={statusOptions}
            onChange={(e) => setStatus(e.target.value)}
          />
          
          <Select
            label="Payment Status"
            value={payment}
            options={paymentOptions}
            onChange={(e) => setPayment(e.target.value)}
          />
        </div>
        
        {/* Tracking information */}
        <div>
          <label htmlFor="tracking" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tracking Number
          </label>
          <input
            type="text"
            id="tracking"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
            placeholder="Enter tracking number"
          />
        </div>
        
        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Notes
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
            placeholder="Add notes about this order"
          />
        </div>
      </div>
      
      <div className="p-4 border-t dark:border-gray-700 flex justify-end space-x-3">
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button 
          variant="primary" 
          icon={<Save />}
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </div>
    </Modal>
  );
};

// DeleteConfirmationModal with improved styling
const DeleteConfirmationModal = ({ orderId, isOpen, onConfirm, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-4 text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-50 dark:bg-red-900/20 mb-4">
          <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Delete Order #{orderId}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Are you sure you want to delete this order? This action cannot be undone.
        </p>
        <div className="flex space-x-3 justify-center">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={() => { 
              onConfirm(orderId); 
              onClose(); 
            }}
          >
            Yes, Delete Order
          </Button>
        </div>
      </div>
    </Modal>
  );
};

// Success modal for confirmations
const SuccessModal = ({ message, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-4 text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-50 dark:bg-green-900/20 mb-4">
          <Check className="h-8 w-8 text-green-600 dark:text-green-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Success</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {message}
        </p>
        <Button variant="primary" onClick={onClose}>
          Continue
        </Button>
      </div>
    </Modal>
  );
};

// Usage example component
const OrderModalExample = () => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Sample order data
  const sampleOrder = {
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
  };

  const handleSave = (updatedData) => {
    console.log("Order updated:", updatedData);
    setSuccessMessage("Order has been successfully updated!");
    setSuccessOpen(true);
  };

  const handleDelete = (orderId) => {
    console.log("Order deleted:", orderId);
    setSuccessMessage(`Order #${orderId} has been successfully deleted!`);
    setSuccessOpen(true);
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex space-x-3">
        <Button variant="primary" onClick={() => setDetailsOpen(true)}>
          View Order Details
        </Button>
        <Button variant="success" onClick={() => setEditOpen(true)}>
          Edit Order
        </Button>
        <Button variant="danger" onClick={() => setDeleteOpen(true)}>
          Delete Order
        </Button>
      </div>

      <OrderDetailsModal 
        order={sampleOrder} 
        isOpen={detailsOpen} 
        onClose={() => setDetailsOpen(false)} 
      />
      
      <EditOrderModal 
        order={sampleOrder} 
        isOpen={editOpen} 
        onSave={handleSave} 
        onClose={() => setEditOpen(false)} 
      />
      
      <DeleteConfirmationModal 
        orderId={sampleOrder.id} 
        isOpen={deleteOpen} 
        onConfirm={handleDelete} 
        onClose={() => setDeleteOpen(false)} 
      />
      
      <SuccessModal 
        message={successMessage} 
        isOpen={successOpen} 
        onClose={() => setSuccessOpen(false)} 
      />
    </div>
  );
};

export { 
  OrderDetailsModal, 
  EditOrderModal, 
  DeleteConfirmationModal, 
  SuccessModal,
  Button,
  Badge,
  Select,
  Modal,
  OrderModalExample
};