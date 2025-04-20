import React from "react";
import DisputeCard from "./DisputeCard";
import { FaExclamationTriangle } from "react-icons/fa";

const DisputeList = ({ disputes, onViewDetails, onCreateDispute }) => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      {disputes.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-xl transition-all">
          <FaExclamationTriangle className="text-5xl mx-auto mb-4 text-amber-500 dark:text-amber-400" />
          <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">No Disputes Found</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto">
            You don't have any disputes yet. Need assistance with a transaction or service? Raise a dispute now!
          </p>
          <button 
            onClick={onCreateDispute}
            className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Raise a Dispute
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Your Disputes</h2>
            <button 
              onClick={onCreateDispute}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              New Dispute
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {disputes.map((dispute) => (
              <DisputeCard 
                key={dispute.id} 
                dispute={dispute} 
                onViewDetails={onViewDetails} 
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DisputeList;