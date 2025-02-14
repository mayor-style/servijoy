// File: components/vendor/disputes/VendorDisputeList.jsx
import React from "react";
import VendorDisputeCard from "./VendorDisputeCard";

const VendorDisputeList = ({ disputes, onViewDetails }) => (
  <div className="max-w-7xl mx-auto px-4">
    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 transition-all duration-300">
      {disputes.length === 0 ? <p className="col-span-full text-center text-gray-500 dark:text-gray-300">No disputes found.</p> : disputes.map((dispute) => <VendorDisputeCard key={dispute.id} dispute={dispute} onViewDetails={onViewDetails} />)}
    </div>
  </div>
);

export default VendorDisputeList;
