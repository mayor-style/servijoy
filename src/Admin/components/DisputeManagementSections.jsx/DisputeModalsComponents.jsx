import React, { useState } from "react";

const DisputeDetailsModal = ({ dispute, onClose }) => (
  <dialog open className="modal transition">
    <div className="modal-box bg-soft-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
      <h3 className="text-lg font-bold mb-2">Dispute Details: {dispute.id}</h3>
      <p className="mb-2"><strong>Vendor:</strong> {dispute.vendor}</p>
      <p className="mb-2"><strong>Subject:</strong> {dispute.subject}</p>
      <p className="mb-2"><strong>Date:</strong> {dispute.date}</p>
      <p className="mb-2"><strong>Description:</strong> {dispute.description || "N/A"}</p>
      <p className="mb-2"><strong>Status:</strong> {dispute.status}</p>
      <button className="btn btn-primary mt-4" onClick={onClose}>Close</button>
    </div>
  </dialog>
);

const EditDisputeModal = ({ dispute, onSave, onClose }) => {
  const [status, setStatus] = useState(dispute.status);
  const [notes, setNotes] = useState(dispute.notes || "");

  const handleSave = () => {
    onSave({ status, notes });
    onClose();
  };

  return (
    <dialog open className="modal transition">
      <div className="modal-box bg-soft-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
        <h3 className="text-lg font-bold mb-4">Edit Dispute: {dispute.id}</h3>
        <label className="block text-gray-700 dark:text-gray-300 mb-2">Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="select select-bordered w-full mb-4 dark:bg-gray-700">
          <option>Pending</option>
          <option>Resolved</option>
          <option>Rejected</option>
        </select>
        <label className="block text-gray-700 dark:text-gray-300 mb-2">Notes:</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="textarea textarea-bordered w-full mb-4 dark:bg-gray-700"></textarea>
        <div className="flex gap-4">
          <button className="btn btn-success" onClick={handleSave}>Save Changes</button>
          <button className="btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </dialog>
  );
};

const DeleteDisputeModal = ({ disputeId, onConfirm, onClose }) => (
  <dialog open className="modal transition">
    <div className="modal-box bg-soft-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
      <h3 className="font-bold text-lg mb-2">Confirm Delete</h3>
      <p className="mb-4">Are you sure you want to delete dispute #{disputeId}? This action cannot be undone.</p>
      <div className="modal-action flex gap-4">
        <button className="btn btn-error" onClick={() => { onConfirm(disputeId); onClose(); }}>Yes, Delete</button>
        <button className="btn" onClick={onClose}>Cancel</button>
      </div>
    </div>
  </dialog>
);

export { DisputeDetailsModal, EditDisputeModal, DeleteDisputeModal };
