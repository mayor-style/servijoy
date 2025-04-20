import React, { useState, useRef, useEffect } from "react";
import { CheckCircle, XCircle, AlertTriangle, Trash2, Loader2 } from "lucide-react";

const BulkActionsPanel = ({ selectedItems, onBulkAction }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [actionToConfirm, setActionToConfirm] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const tooltipTimeoutRef = useRef(null);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
      }
    };
  }, []);

  const handleAction = async (action) => {
    // Destructive actions require confirmation
    if (action === "delete" || action === "suspend") {
      setActionToConfirm(action);
      setIsDialogOpen(true);
      return;
    }
    
    await executeAction(action);
  };

  const executeAction = async (action) => {
    setIsProcessing(true);
    try {
      await onBulkAction(action, selectedItems);
    } finally {
      setIsProcessing(false);
      setIsDialogOpen(false);
    }
  };

  const handleTooltipEnter = (actionId) => {
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
    }
    setActiveTooltip(actionId);
  };

  const handleTooltipLeave = () => {
    tooltipTimeoutRef.current = setTimeout(() => {
      setActiveTooltip(null);
    }, 200);
  };

  // Action definitions for easy maintenance
  const actions = [
    {
      id: "activate",
      label: "Activate",
      icon: <CheckCircle size={16} />,
      tooltip: "Activate selected items",
      classes: "bg-emerald-500 hover:bg-emerald-600 text-white"
    },
    {
      id: "deactivate",
      label: "Deactivate",
      icon: <XCircle size={16} />,
      tooltip: "Deactivate selected items",
      classes: "bg-blue-500 hover:bg-blue-600 text-white"
    },
    {
      id: "suspend",
      label: "Suspend",
      icon: <AlertTriangle size={16} />,
      tooltip: "Temporarily suspend selected items",
      classes: "bg-amber-500 hover:bg-amber-600 text-white"
    },
    {
      id: "delete",
      label: "Delete",
      icon: <Trash2 size={16} />,
      tooltip: "Permanently delete selected items",
      classes: "bg-red-500 hover:bg-red-600 text-white"
    }
  ];

  // Get action details by ID
  const getActionDetails = (actionId) => {
    return actions.find(action => action.id === actionId);
  };

  const noItemsSelected = selectedItems.length === 0;

  // Custom Tooltip Component
  const Tooltip = ({ children, content, isVisible }) => {
    return (
      <div className="relative inline-block">
        {children}
        {isVisible && (
          <div className="absolute z-10 w-max max-w-xs px-2 py-1 -translate-x-1/2 -translate-y-full text-xs text-white bg-gray-800 rounded-md left-1/2 top-0 mt-1 opacity-100 transition-opacity">
            {content}
            <div className="absolute w-2 h-2 bg-gray-800 transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1"></div>
          </div>
        )}
      </div>
    );
  };

  // Custom Dialog Component
  const Dialog = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    useEffect(() => {
      const handleEscape = (event) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
        <div 
          className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4 p-6 transform transition-all animate-fadeIn"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded-lg shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 transition">
        <div className="flex items-center gap-2">
          <div className="py-1.5 px-3 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 rounded-full text-xs font-medium">
            {selectedItems.length} 
            <span className="ml-1 hidden sm:inline">
              {selectedItems.length === 1 ? "item" : "items"} selected
            </span>
          </div>
          
          {isProcessing && (
            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Loader2 size={12} className="animate-spin" />
              Processing...
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {actions.map((action) => (
            <Tooltip 
              key={action.id}
              content={
                <div>
                  <p>{action.tooltip}</p>
                  {noItemsSelected && <p className="text-xs">No items selected</p>}
                </div>
              }
              isVisible={activeTooltip === action.id}
            >
              <button
                onClick={() => handleAction(action.id)}
                disabled={isProcessing || noItemsSelected}
                onMouseEnter={() => handleTooltipEnter(action.id)}
                onMouseLeave={handleTooltipLeave}
                className={`${action.classes} rounded-md px-3 py-2 text-sm font-medium transition-all transform hover:scale-105 hover:shadow-md disabled:opacity-40 disabled:transform-none disabled:hover:shadow-none disabled:cursor-not-allowed flex items-center gap-2`}
              >
                {action.icon}
                <span className="hidden sm:inline">{action.label}</span>
              </button>
            </Tooltip>
          ))}
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)}
      >
        <div className="space-y-4">
          <div className="border-b pb-2 mb-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              {actionToConfirm && getActionDetails(actionToConfirm)?.icon}
              Confirm {actionToConfirm && getActionDetails(actionToConfirm)?.label}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Are you sure you want to {actionToConfirm} {selectedItems.length} {selectedItems.length === 1 ? "item" : "items"}?
            </p>
            {actionToConfirm === "delete" && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-2">This action cannot be undone.</p>
            )}
          </div>
          
          <div className="flex flex-col-reverse sm:flex-row gap-2 sm:justify-end pt-2">
            <button
              onClick={() => setIsDialogOpen(false)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => executeAction(actionToConfirm)}
              className={`${
                actionToConfirm === "delete" 
                  ? "bg-red-500 hover:bg-red-600" 
                  : "bg-amber-500 hover:bg-amber-600"
              } text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2`}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {actionToConfirm && getActionDetails(actionToConfirm)?.icon}
                  <span>Confirm {actionToConfirm && getActionDetails(actionToConfirm)?.label}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default BulkActionsPanel;