
// File: components/dispute/DisputeList.jsx
import React from "react";
import DisputeCard from "./DisputeCard";

const DisputeList = ({ disputes, onViewDetails }) => (
  <div className="max-w-7xl mx-auto p-2">
    {disputes.length === 0 ? (
      <p className="text-center text-lg text-gray-500 dark:text-gray-300">No disputes found.</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {disputes.map((dispute) => (
          <DisputeCard key={dispute.id} dispute={dispute} onViewDetails={onViewDetails} />
        ))}
      </div>
    )}
  </div>
);

export default DisputeList;
