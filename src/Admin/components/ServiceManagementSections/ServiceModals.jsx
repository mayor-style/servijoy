import React, { useState } from "react";

const ServiceModals = () => {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Sample data for demonstration
  const requestDetails = {
    id: "REQ123",
    requester: "John Doe (Vendor)",
    service: "Home Cleaning",
    category: "Cleaning",
    description: "Weekly home cleaning service",
    attachments: ["invoice.pdf", "contract.docx"],
    history: [
      { date: "2025-02-10", action: "Request Submitted" },
      { date: "2025-02-12", action: "Status changed to Pending" },
    ],
  };

  const categoryDetails = {
    name: "Cleaning",
    totalServices: 15,
    status: "Active",
    createdAt: "2025-01-01",
    modifiedHistory: [
      { date: "2025-01-05", action: "Category created" },
      { date: "2025-02-01", action: "Status changed to Active" },
    ],
  };

  return (
    <div>
      {/* Request Details Modal */}
      {showRequestModal && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Service Request Details</h3>
            <p><strong>Requester:</strong> {requestDetails.requester}</p>
            <p><strong>Service:</strong> {requestDetails.service}</p>
            <p><strong>Category:</strong> {requestDetails.category}</p>
            <p><strong>Description:</strong> {requestDetails.description}</p>
            <p><strong>Attachments:</strong> {requestDetails.attachments.join(", ")}</p>
            <p className="mt-2"><strong>Status History:</strong></p>
            <ul className="list-disc ml-4">
              {requestDetails.history.map((item, index) => (
                <li key={index}>{item.date} - {item.action}</li>
              ))}
            </ul>
            <div className="modal-action">
              <button className="btn" onClick={() => setShowRequestModal(false)}>Close</button>
            </div>
          </div>
        </dialog>
      )}

      {/* Category Details Modal */}
      {showCategoryModal && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Service Category Details</h3>
            <p><strong>Category:</strong> {categoryDetails.name}</p>
            <p><strong>Total Services:</strong> {categoryDetails.totalServices}</p>
            <p><strong>Status:</strong> {categoryDetails.status}</p>
            <p><strong>Created At:</strong> {categoryDetails.createdAt}</p>
            <p className="mt-2"><strong>Modification History:</strong></p>
            <ul className="list-disc ml-4">
              {categoryDetails.modifiedHistory.map((item, index) => (
                <li key={index}>{item.date} - {item.action}</li>
              ))}
            </ul>
            <div className="modal-action">
              <button className="btn" onClick={() => setShowCategoryModal(false)}>Close</button>
            </div>
          </div>
        </dialog>
      )}

      {/* Edit Category Modal */}
      {showEditCategoryModal && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Service Category</h3>
            <form>
              <label className="form-control w-full mb-2">
                <span className="label-text">Category Name</span>
                <input type="text" className="input input-bordered w-full" defaultValue={categoryDetails.name} />
              </label>
              <label className="form-control w-full mb-2">
                <span className="label-text">Status</span>
                <select className="select select-bordered w-full">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </label>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" className="btn" onClick={() => setShowEditCategoryModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </dialog>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Deletion</h3>
            <p>Are you sure you want to delete this item? This action cannot be undone.</p>
            <div className="modal-action">
              <button className="btn btn-error">Delete</button>
              <button className="btn" onClick={() => setShowDeleteModal(false)}>Cancel</button>
            </div>
          </div>
        </dialog>
      )}

      {/* Buttons to trigger modals (for demonstration purposes) */}
      <div className="flex gap-2 mt-4">
        <button className="btn" onClick={() => setShowRequestModal(true)}>Show Request Details</button>
        <button className="btn" onClick={() => setShowCategoryModal(true)}>Show Category Details</button>
        <button className="btn" onClick={() => setShowEditCategoryModal(true)}>Edit Category</button>
        <button className="btn btn-error" onClick={() => setShowDeleteModal(true)}>Delete</button>
      </div>
    </div>
  );
};

export default ServiceModals;
