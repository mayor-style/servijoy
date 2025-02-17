import React from 'react'
import { DeleteDisputeModal, DisputeDetailsModal, EditDisputeModal } from './DisputeModalsComponents';

const DisputeModal = ({type, dispute,
    onClose,
    onSave,
    onConfirm
    }) => {
    if (!dispute) return null; // Ensure dispute data is available
  
    switch (type) {
      case "edit":
        return <EditDisputeModal dispute={dispute} onClose={onClose} onSave={onSave} />;
      case "details":
        return <DisputeDetailsModal dispute={dispute}  onClose={onClose} />;
      case "delete":
        return <DeleteDisputeModal disputeId={dispute.id} onConfirm={onConfirm} onClose={onClose} />;
      default:
        return null;
    }
};

export default DisputeModal
