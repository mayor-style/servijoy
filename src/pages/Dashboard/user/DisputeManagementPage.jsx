import React, { useState } from "react";
import DisputeList from "./components/DisputeManangementSections/DisputeList";
import DisputeDetailsModal from "./components/DisputeManangementSections/DisputeDetailsModal";
import NewDisputeForm from "./components/DisputeManangementSections/NewDisputeForm";

const DisputeManagement = () => {
  const initialDisputes = [
    {
      id: 1,
      subject: "Service Not Delivered",
      description: "I paid for a service, but it was not delivered as promised.",
      reference: "BK-1001",
      date: "2025-03-01",
      status: "pending",
      messages: [{ sender: "User", message: "I raised a dispute regarding non-delivery." }],
    },
    {
      id: 2,
      subject: "Incorrect Billing",
      description: "I was overcharged for the service rendered.",
      reference: "BK-1002",
      date: "2025-02-20",
      status: "resolved",
      messages: [{ sender: "Support", message: "Your issue has been resolved and a refund issued." }],
    },
    {
      id: 3,
      subject: "Poor Service Quality",
      description: "The quality of service was subpar and did not meet the advertised standards.",
      reference: "BK-1003",
      date: "2025-02-25",
      status: "in-progress",
      messages: [
        { sender: "User", message: "I am not satisfied with the service quality." },
        { sender: "Support", message: "We are investigating your concern." },
      ],
    },
  ];

  const [disputes, setDisputes] = useState(initialDisputes);
  const [activeTab, setActiveTab] = useState("open");
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isNewDisputeFormOpen, setIsNewDisputeFormOpen] = useState(false);

  const handleViewDetails = (dispute) => {
    setSelectedDispute(dispute);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setSelectedDispute(null);
    setIsDetailsModalOpen(false);
  };

  const handleOpenNewDisputeForm = () => {
    setIsNewDisputeFormOpen(true);
  };

  const handleCloseNewDisputeForm = () => {
    setIsNewDisputeFormOpen(false);
  };

  const handleSubmitNewDispute = (newDispute) => {
    setDisputes([newDispute, ...disputes]);
    setIsNewDisputeFormOpen(false);
  };

  const filteredDisputes = disputes.filter((d) => {
    if (activeTab === "open") {
      return d.status === "pending" || d.status === "in-progress";
    }
    if (activeTab === "resolved") {
      return d.status === "resolved" || d.status === "declined";
    }
    return true;
  });

  return (
    <div className="min-h-screen  dark:bg-gray-900 py-6 px-0 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl md:text-4xl font-bold dark:text-white">Dispute Management</h1>
          <button
            onClick={handleOpenNewDisputeForm}
            className="px-4 md:px-6 py-2 md:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200"
          >
            Raise a Dispute
          </button>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-6 border-b border-gray-300 dark:border-gray-700 pb-3">
          <button
            onClick={() => setActiveTab("open")}
            className={`text-lg md:text-xl font-semibold transition-colors duration-200 ${
              activeTab === "open"
                ? "text-blue-600 border-b-4 border-blue-600"
                : "text-gray-600 dark:text-gray-300 hover:text-blue-500"
            }`}
          >
            Open Disputes
          </button>
          <button
            onClick={() => setActiveTab("resolved")}
            className={`text-lg md:text-xl font-semibold transition-colors duration-200 ${
              activeTab === "resolved"
                ? "text-blue-600 border-b-4 border-blue-600"
                : "text-gray-600 dark:text-gray-300 hover:text-blue-500"
            }`}
          >
            Resolved Disputes
          </button>
        </div>

        <DisputeList disputes={filteredDisputes} onViewDetails={handleViewDetails} />
      </div>

      <DisputeDetailsModal
        dispute={selectedDispute}
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
      />

      <NewDisputeForm
        isOpen={isNewDisputeFormOpen}
        onClose={handleCloseNewDisputeForm}
        onSubmit={handleSubmitNewDispute}
      />
    </div>
  );
};

export default DisputeManagement;
