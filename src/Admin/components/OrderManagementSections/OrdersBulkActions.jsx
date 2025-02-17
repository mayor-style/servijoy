import { useState } from "react";

const OrdersBulkActions = ({ selectedOrders, onActionComplete }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [action, setAction] = useState('');
  
    const handleBulkAction = async (type) => {
      if (selectedOrders.length === 0) {
        alert('No orders selected');
        return;
      }
  
      setLoading(true);
      setAction(type);
      setError('');
  
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
  
        onActionComplete(type, selectedOrders);
        alert(`Successfully performed ${type} on selected orders`);
      } catch (err) {
        setError(`Failed to perform ${type}`);
      } finally {
        setLoading(false);
        setAction('');
      }
    };
  
    return (
      <div className="flex items-center gap-4 mt-4">
        <button
          className="btn btn-primary"
          onClick={() => handleBulkAction('Update Status')}
          disabled={loading}
        >
          {loading && action === 'Update Status' ? 'Updating...' : 'Update Status'}
        </button>
        <button
          className="btn btn-warning"
          onClick={() => handleBulkAction('Cancel')}
          disabled={loading}
        >
          {loading && action === 'Cancel' ? 'Canceling...' : 'Cancel Orders'}
        </button>
        <button
          className="btn btn-error"
          onClick={() => handleBulkAction('Delete')}
          disabled={loading}
        >
          {loading && action === 'Delete' ? 'Deleting...' : 'Delete Orders'}
        </button>
  
        {error && <div className="alert alert-error mt-2">{error}</div>}
      </div>
    );
  };
  
  export default OrdersBulkActions;
  