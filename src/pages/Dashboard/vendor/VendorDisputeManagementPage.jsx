// File: components/vendor/disputes/VendorDisputeManagement.jsx
import React, { useState } from "react";
import VendorDisputeList from "./components/VendorDisputeManagement/VendorDisputeList";
import VendorDisputeDetailsModal from "./components/VendorDisputeManagement/VendorDisputeDetailsModal";

const VendorDisputeManagement = () => {
  const initialDisputes = [
    { id: 1, subject: "Late Service Delivery", description: "Customer complains that the service was delivered later than promised.", reference: "BK-2001", date: "2025-03-01", status: "pending", client: "Alice Johnson", messages: [{ sender: "Customer", message: "I waited for over an hour!" }, { sender: "Vendor", message: "We're investigating this issue." }] },
    { id: 2, subject: "Incorrect Service Charge", description: "Customer disputes the final amount charged for the service.", reference: "BK-2002", date: "2025-02-25", status: "in-progress", client: "Bob Smith", messages: [{ sender: "Customer", message: "The charge is much higher than quoted." }, { sender: "Vendor", message: "Please provide more details." }] },
    { id: 3, subject: "Poor Service Quality", description: "Customer reports that the quality of service was not up to the expected standards.", reference: "BK-2003", date: "2025-02-20", status: "resolved", client: "Cathy Lee", messages: [{ sender: "Customer", message: "The work done was unsatisfactory." }, { sender: "Vendor", message: "We have resolved the issue with a refund." }] },
  ];

  const [disputes, setDisputes] = useState(initialDisputes);
  const [activeTab, setActiveTab] = useState("open");
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const filteredDisputes = disputes.filter((dispute) => activeTab === "open" ? dispute.status === "pending" || dispute.status === "in-progress" : dispute.status === "resolved" || dispute.status === "declined");

  const handleViewDetails = (dispute) => { setSelectedDispute(dispute); setIsDetailsModalOpen(true); };
  const handleCloseModal = () => { setSelectedDispute(null); setIsDetailsModalOpen(false); };
  const handleUpdateStatus = (id, newStatus) => { setDisputes((prev) => prev.map((d) => (d.id === id ? { ...d, status: newStatus } : d))); setIsDetailsModalOpen(false); };

  return (
    <div className="min-h-screen  dark:bg-gray-900 py-10 px-0 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold dark:text-white">Dispute Management</h1>
        </div>
        <div className="flex space-x-6 border-b border-gray-300 dark:border-gray-700 pb-3">
          {["open", "resolved"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`font-semibold transition-colors duration-200 ${activeTab === tab ? "text-blue-600 border-b-4 border-blue-600" : "text-gray-600 dark:text-gray-300 hover:text-blue-500"}`}>{tab === "open" ? "Open Disputes" : "Resolved Disputes"}</button>
          ))}
        </div>
        <VendorDisputeList disputes={filteredDisputes} onViewDetails={handleViewDetails} />
      </div>
      <VendorDisputeDetailsModal dispute={selectedDispute} isOpen={isDetailsModalOpen} onClose={handleCloseModal} onUpdateStatus={handleUpdateStatus} />
    </div>
  );
};
export default VendorDisputeManagement;

